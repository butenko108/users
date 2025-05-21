import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useAddUser, useUpdateUser } from "../graphql/hooks";
import type { User } from "../types/types";

interface UserFormInputs {
	name: string;
}

interface UserFormProps {
	user: User | null;
	onClose: () => void;
}

export const UserForm: FC<UserFormProps> = ({ user, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserFormInputs>({
		defaultValues: {
			name: user?.first_name || "",
		},
	});

	const [addUser] = useAddUser(onClose);
	const [updateUser] = useUpdateUser(onClose);

	const onSubmit = (data: UserFormInputs) => {
		if (user) {
			updateUser({
				variables: {
					pkColumns: { id: user.id },
					set: { first_name: data.name },
				},
			});
		} else {
			addUser({ variables: { object: { first_name: data.name } } });
		}
	};

	return (
		<div className="user-form-overlay">
			<div className="user-form">
				<h2>{user ? "Редактировать пользователя" : "Добавить пользователя"}</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<label htmlFor="name">Имя</label>
						<input
							id="name"
							{...register("name", { required: "Имя обязательно" })}
						/>
						{errors.name && (
							<span className="error">{errors.name.message}</span>
						)}
					</div>

					<div className="form-actions">
						<button type="button" onClick={onClose}>
							Отмена
						</button>
						<button type="submit">{user ? "Сохранить" : "Добавить"}</button>
					</div>
				</form>
			</div>
		</div>
	);
};
