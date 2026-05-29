import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors as Light, DarkColors } from '@/theme/colors';
import Toast from 'react-native-toast-message';

export interface User {
  email: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  colors: typeof Light | typeof DarkColors;
  fav: any[];

  addresses: any[];
  selectedAddress: any;

  addAddress: (address: any) => Promise<void>;
  selectAddress: (address: any) => void;
  removeAddress: (id: string) => Promise<void>;


  addToFav: (item: any) => void;
  removeFav: (item: any) => void;

  signIn: (
    email: string,
    password: string
  ) => Promise<void>;

  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  signOut: () => Promise<void>;

  resetPassword: (
    email: string
  ) => Promise<void>;

  completeOnboarding: () => Promise<void>;

  cart: any[];
  addToCart: (item: any) => void;
  removeCart: (item: any) => void;
  clearCart:()=>void

  increaseQty: (item: any) => void;
  decreaseQty: (item: any) => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] =
    useState<User | null>(null);

  const [
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
  ] = useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [fav, setFav] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const colors = darkMode ? DarkColors : Light
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {

      const savedAddresses =
        await AsyncStorage.getItem('addresses');

      if (savedAddresses) {
        const parsed = JSON.parse(savedAddresses);

        setAddresses(parsed);

        if (parsed.length > 0) {
          setSelectedAddress(parsed[0]);
        }
      }
      setIsLoading(true);

      // onboarding
      const onboarding =
        await AsyncStorage.getItem(
          'hasCompletedOnboarding'
        );

      if (onboarding === 'true') {
        setHasCompletedOnboarding(true);
      }

      // user session
      const storedUser =
        await AsyncStorage.getItem('user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const userData = {
        email,
        name: email.split('@')[0],
      };

      setUser(userData);

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(userData)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const userData = {
        email,
        name,
      };

      setUser(userData);

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(userData)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);

      setUser(null);

      await AsyncStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    email: string
  ) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      setIsLoading(true);

      setHasCompletedOnboarding(true);

      await AsyncStorage.setItem(
        'hasCompletedOnboarding',
        'true'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addToFav = (item: any) => {
    setFav((prev) => [...prev, item]);
  };

  const removeFav = (item: any) => {
    setFav((prev) =>
      prev.filter((i) => i.id !== item.id)
    );
  };


  const addToCart = (item: any) => {
    setCart((prev: any) => {
      const exist = prev.find((i: any) => i.id === item?.id)
      if (exist) {
        Toast.show({
          type: 'success',
          text1: 'Item already in cart',
          position: "bottom"
        })
        return prev.map((i: any) => i.id === item?.id ? { ...i, qty: i.qty + 1 } : i)
      }
      else {
        Toast.show({
          type: 'success',
          text1: 'Item added to cart',
          position: "bottom"
        })
        return [...prev, { ...item, qty: 1 }]
      }
    })
  }


  const removeCart = (item: any) => {
    setCart((prev: any) => prev.filter((i: any) => i.id !== item?.id))

    Toast.show({
      type: 'error',
      text1: 'Item removed from cart',
      position: "bottom"
    })
  }


  const clearCart=()=>{
    setCart([])
  }

  const increaseQty = (item: any) => {
    setCart((prev: any) => prev.map((i: any) => i.id === item?.id ? { ...i, qty: i.qty + 1 } : i))
  }

  const decreaseQty = (item: any) => {
    setCart((prev: any) => prev.map((i: any) => i.id === item?.id ? { ...i, qty: i.qty - 1 } : i))
  }

  const addAddress = async (address: any) => {
    try {
      if (addresses.length >= 3) {
        return;
      }

      const newAddress = {
        id: Date.now().toString(),
        ...address,
      };

      const updated = [
        ...addresses,
        newAddress,
      ];

      setAddresses(updated);

      setSelectedAddress(newAddress);

      await AsyncStorage.setItem(
        'addresses',
        JSON.stringify(updated)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const selectAddress = (address: any) => {
    setSelectedAddress(address);
  };

  const removeAddress = async (id: string) => {
    try {
      const updated = addresses.filter(
        (item) => item.id !== id
      );

      setAddresses(updated);

      await AsyncStorage.setItem(
        'addresses',
        JSON.stringify(updated)
      );

      if (selectedAddress?.id === id) {
        setSelectedAddress(
          updated[0] || null
        );
      }
    } catch (error) {
      console.log(error);
    }
  };






  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        hasCompletedOnboarding,

        signIn,
        signUp,
        signOut,
        resetPassword,
        completeOnboarding,
        darkMode, setDarkMode, colors,

        fav,
        addToFav,
        removeFav,

        cart,
        addToCart,
        removeCart,
        clearCart,

        increaseQty,
        decreaseQty,


        addresses,
        selectedAddress,

        addAddress,
        selectAddress,
        removeAddress,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}