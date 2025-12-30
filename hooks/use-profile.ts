import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getProfile } from '@/lib/data-service';
import { Profile } from '@/types';

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const data = await getProfile(user.id);
                setProfile(data);
            }
            setLoading(false);
        }

        fetchProfile();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    const data = await getProfile(session.user.id);
                    setProfile(data);
                } else {
                    setProfile(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return { profile, loading };
}
