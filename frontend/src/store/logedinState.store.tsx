import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  firstName: string;
  secondName: string;
  email: string;
  userName: string;
  id: string;
  imgUrl:string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "user-store" }
  )
);


export default useUserStore;
