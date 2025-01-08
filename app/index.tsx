import {useAuth} from "@clerk/clerk-expo";
import {Redirect} from "expo-router";

const Page = () => {
    const {isSignedIn} = useAuth();

    return isSignedIn ? <Redirect href="/(root)/(tabs)/home"/> : <Redirect href="/(auth)/welcome"/>;
};

export default Page;
