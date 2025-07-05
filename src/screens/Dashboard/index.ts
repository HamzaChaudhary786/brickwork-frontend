


export interface User {
    result: User | PromiseLike<User>;
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardProps {
    user: User | null;
}

export { Dashboard } from "./Dashboard";
