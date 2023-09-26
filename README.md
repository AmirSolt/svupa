#Supabase settings:

1. Setup new user trigger and function on supabase.
2. Change auth email to token from link.
3. (optional) setup an email
4. to sync database types:
<sub> 

supabase gen types typescript --project-id {project_id} > ./src/lib/utils/database.types.ts
</sub>

Stripe Settings:
1. create plans
2. paste their ids in $lib/utils/config.ts in plans


##Extra Help:

1. To setup on user create postgres trigger in supabase:

    - To create trigger-function:
        <sub> 

            begin
                insert into public.wallets(id)
                values(new.id);
                insert into public.profiles(id, wallet, first_name, last_name)
                values(
                    new.id,
                    new.id,
                    new.raw_user_meta_data->>'first_name',
                    new.raw_user_meta_data->>'last_name');

                return new;
            end;
        </sub>
    - To create trigger use UI if it doesn't work:
        <sub> 

            create trigger on_new_user
            after insert on user
            for each row
            execute function create_user_features();
        </sub>

    - follow this video: https://www.youtube.com/watch?v=0N6M5BBe9AE&ab_channel=Supabase