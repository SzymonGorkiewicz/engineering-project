'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper: React.FC<P> = (props) => {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
            try {
                
                const response = await axios.get(`${backendURL}auth/check-auth`,{
                    withCredentials:true
                })
                if (response.status === 200){
                    setLoading(false);
                }else{
                    router.push('/login')
                }
                    
                
            }catch(error){
                if (axios.isAxiosError(error)) {
                    
                    if (error.response?.status === 401) {
                        router.push('/login'); 
                    }
                } else {
                    console.error('Error checking authentication', error);
                }
            }
        };
            checkAuth()
        }, [router]);

        if (loading) {
            return <div>Checking Authentication...</div>; 
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
