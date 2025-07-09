
// types.ts

export interface PopupProps {
    editProfile: boolean;
    onClose: () => void;
    authClient: any; // Replace `any` with the actual type if available
}

export interface FormData {
    name: string;
    username: string;
    steamId: string;
    starCitizenId: string;
}



export { Profile } from "./Profile";