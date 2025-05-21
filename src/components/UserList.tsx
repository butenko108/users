import { type Reference, useMutation, useQuery } from "@apollo/client";
import type { FC } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { DELETE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import type {
	DeleteUserData,
	DeleteUserVars,
	GetUsersData,
	User,
} from "../types/types";
import UserForm from "./UserForm";

const UserList: FC = () => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const { loading, error, data } = useQuery<GetUsersData>(GET_USERS);

	const [deleteUser] = useMutation<DeleteUserData, DeleteUserVars>(
		DELETE_USER,
		{
			update(cache, { data }) {
				if (!data) return;
				const userId = data.delete_user_by_pk.id;

				cache.modify({
					fields: {
						user(
							existingUserRefs: readonly Reference[] | undefined,
							{ readField },
						) {
							const userRefs = existingUserRefs ?? [];

							return userRefs.filter(
								(userRef) => readField("id", userRef) !== userId,
							);
						},
					},
				});
			},
			onCompleted() {
				toast.success("Пользователь успешно удален");
			},
			onError(error) {
				toast.error(`Ошибка при удалении пользователя: ${error.message}`);
			},
		},
	);

	const handleDelete = (id: string) => {
		if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
			deleteUser({ variables: { id } });
		}
	};

	const handleEdit = (user: User) => {
		setSelectedUser(user);
		setIsFormOpen(true);
	};

	const handleAddNew = () => {
		setSelectedUser(null);
		setIsFormOpen(true);
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error.message}</p>;
	if (!data) return null;

	return (
		<div className="user-list-container">
			<button type="button" onClick={handleAddNew} className="add-button">
				Добавить пользователя
			</button>

			{isFormOpen && <UserForm user={selectedUser} onClose={handleCloseForm} />}

			<ul className="user-list">
				{data.users.map((user) => (
					<li key={user.id} className="user-item">
						<span>{user.first_name}</span>
						<div className="user-actions">
							<button type="button" onClick={() => handleEdit(user)}>
								Редактировать
							</button>
							<button type="button" onClick={() => handleDelete(user.id)}>
								Удалить
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
