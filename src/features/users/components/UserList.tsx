import { useQuery } from "@apollo/client";
import type { FC } from "react";
import { useState } from "react";
import { UserForm, UserItem } from ".";
import { useDeleteUser } from "../graphql/hooks";
import { GET_USERS } from "../graphql/queries";
import type { GetUsersData, User } from "../types/types";

export const UserList: FC = () => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const { loading, error, data } = useQuery<GetUsersData>(GET_USERS);
	const [deleteUser] = useDeleteUser();

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
	if (!data) return <p>Обновите страницу...</p>;

	return (
		<div className="user-list-container">
			<button type="button" onClick={handleAddNew} className="add-button">
				Добавить пользователя
			</button>

			{isFormOpen && <UserForm user={selectedUser} onClose={handleCloseForm} />}

			<ul className="user-list">
				{data.users.map((user) => (
					<UserItem
						key={user.id}
						user={user}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				))}
			</ul>
		</div>
	);
};
