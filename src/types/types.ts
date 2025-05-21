export interface User {
	id: string;
	first_name: string;
}

export interface GetUsersData {
	users: User[];
}

export interface DeleteUserData {
	delete_user_by_pk: {
		id: string;
	};
}

export interface DeleteUserVars {
	id: string;
}

export interface AddUserResponse {
	insert_user_one: {
		id: string;
		first_name: string;
		created_at: string;
	};
}

export interface AddUserVariables {
	object: {
		first_name: string;
	};
}

export interface UpdateUserResponse {
	update_user_by_pk: {
		id: string;
		first_name: string;
	};
}

export interface UpdateUserVariables {
	pkColumns: {
		id: string;
	};
	set: {
		first_name: string;
	};
}
