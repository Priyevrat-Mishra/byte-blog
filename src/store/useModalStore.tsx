import { create } from "zustand/react";

interface ModalState{
    isSignInOpen:boolean,
    isSearchOpen:boolean, 
    openSignIn:() => void;
    closeSignIn:() => void;
    openSearch:() => void;
    closeSearch:() => void;
    closeAll:() => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isSignInOpen: false,
    isSearchOpen: false, 
    openSignIn:() => set({isSignInOpen: true, isSearchOpen: false}),
    closeSignIn:() => set({isSignInOpen: false}),
    openSearch:() => set({isSignInOpen: false, isSearchOpen: true}),
    closeSearch:() => set({isSearchOpen: false}),
    closeAll:() => set({isSignInOpen: false, isSearchOpen: false}),
}))