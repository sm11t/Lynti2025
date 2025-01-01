import {useSignUp} from "@clerk/clerk-expo";
import {Link, router} from "expo-router";
import {useState} from "react";
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {ReactNativeModal} from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import {icons, images} from "@/constants";
import {fetchAPI} from "@/lib/fetch";

const SignUp = () => {
    const {isLoaded, signUp, setActive} = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            // 1. Create a new sign-up with email & password
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });
            // 2. Send verification code to the user's email
            await signUp.prepareEmailAddressVerification({strategy: "email_code"});
            setVerification({
                ...verification,
                state: "pending",
            });
        } catch (err: any) {
            // Clerk custom flow error handling
            console.log(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors?.[0]?.longMessage ?? "Sign up failed");
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) return;
        try {
            // 3. Attempt to verify the email with the entered code
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });
            if (completeSignUp.status === "complete") {
                // 4. Verification complete—set session active
                await fetchAPI('/(api)/user', {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: completeSignUp.createdUserId,
                    }),
                })
                await setActive({session: completeSignUp.createdSessionId});
                setVerification({
                    ...verification,
                    state: "success",
                });
            } else {
                // If the sign-up isn't complete, show error
                setVerification({
                    ...verification,
                    error: "Verification failed. Please try again.",
                    state: "failed",
                });
            }
        } catch (err: any) {
            setVerification({
                ...verification,
                error: err.errors?.[0]?.longMessage ?? "Verification error",
                state: "failed",
            });
        }
    };

    return (
        <ScrollView className="flex-1 bg-razer-black">
            <View className="flex-1 bg-razer-black">
                {/* Header image & title */}
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]"/>
                    <Text className="text-2xl text-razer-green font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>
                </View>

                {/* Sign-Up Form */}
                <View className="p-5">
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({...form, name: value})}
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({...form, email: value})}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({...form, password: value})}
                    />

                    <CustomButton
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className="mt-6 bg-razer-green text-black"
                    />
                    <OAuth/>

                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-razer-lightGray mt-10"
                    >
                        <Text>
                            Already have an account?{" "}
                        </Text>

                        <Text className="text-razer-green">Log In</Text>
                    </Link>
                </View>

                {/* Verification Modal */}
                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                        }
                    }}
                >
                    <View className="bg-razer-darkGray px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="font-JakartaExtraBold text-2xl text-razer-green mb-2">
                            Verification
                        </Text>
                        <Text className="font-Jakarta text-razer-lightGray mb-5">
                            We've sent a verification code to {form.email}.
                        </Text>
                        <InputField
                            label="Code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) =>
                                setVerification({...verification, code})
                            }
                        />
                        {verification.error ? (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        ) : null}

                        <CustomButton
                            title="Verify Email"
                            onPress={onPressVerify}
                            className="mt-5 bg-razer-green text-black"
                        />
                    </View>
                </ReactNativeModal>

                {/* Success Modal */}
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-razer-darkGray px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl font-JakartaBold text-razer-green text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-razer-lightGray font-Jakarta text-center mt-2">
                            You have successfully verified your account.
                        </Text>
                        <CustomButton
                            title="Browse Home"
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push(`/(root)/(tabs)/home`);
                            }}
                            className="mt-5 bg-razer-green text-black"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
};

export default SignUp;
