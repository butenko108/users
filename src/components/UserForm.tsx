import { useMutation } from "@apollo/client";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ADD_USER, UPDATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import type {
	AddUserResponse,
	AddUserVariables,
	GetUsersData,
	UpdateUserResponse,
	UpdateUserVariables,
	User,
} from "../types/types";

interface UserFormInputs {
	name: string;
}

interface UserFormProps {
	user: User | null;
	onClose: () => void;
}

const UserForm: FC<UserFormProps> = ({ user, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserFormInputs>({
		defaultValues: {
			name: user?.first_name || "",
		},
	});

	const [addUser] = useMutation<AddUserResponse, AddUserVariables>(ADD_USER, {
		update(cache, { data }) {
			if (!data) return;

			const cached = cache.readQuery<GetUsersData>({ query: GET_USERS }) || {
				users: [],
			};

			cache.writeQuery<GetUsersData>({
				query: GET_USERS,
				data: { users: [...cached.users, data.insert_user_one] },
			});
		},
		onCompleted: () => {
			toast.success("Пользователь успешно добавлен");
			onClose();
		},
		onError: (error) => {
			toast.error(`Ошибка при добавлении пользователя: ${error.message}`);
		},
	});

	const [updateUser] = useMutation<UpdateUserResponse, UpdateUserVariables>(
		UPDATE_USER,
		{
			onCompleted: () => {
				toast.success("Пользователь успешно обновлен");
				onClose();
			},
			onError: (error) => {
				toast.error(`Ошибка при обновлении пользователя: ${error.message}`);
			},
		},
	);

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

export default UserForm;
