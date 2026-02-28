import React, { useState, useEffect, useRef } from "react";
import Layout from "../common/Layout";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form";
import axios from "../common/axiosConfig";
import toast from "react-hot-toast";

const Profile = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const inputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(null);

    // ✅ Get user info
    const getUserInfo = async () => {
        try {
            const response = await axios.get("/users/fetch-user");

            if (response.success) {
                const user = response.data.user;

                reset({
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    location: user.location,
                });

                setProfilePic(user.avatar);
            }

        } catch (error) {
            console.log(error.response?.data || "Something went wrong");
        }
    };

    // ✅ Update profile info
    const updateProfile = async (formData) => {
        try {
            const response = await axios.put("/users/update-profile", formData);

            if (response.success) {
                const user = response.data.user;

                reset({
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    location: user.location,
                });

                toast.success(response.message);
            }

        } catch (error) {
            console.log(error.response?.data || "Something went wrong");
        }
    };

    // ✅ Trigger hidden file input
    const handleClick = () => {
        inputRef.current.click();
    };

    // ✅ Upload profile picture
    const handleFile = async (e) => {
        try {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);

            const response = await axios.put(
                "/users/update-profile-pic",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.success) {
                setProfilePic(response.data.url);
                toast.success(response.message);
            }

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <Layout>
            <div className="py-8">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="flex flex-col md:flex-row gap-8">

                        <Sidebar />

                        <main className="flex-1">
                            <div className="space-y-6">

                                {/* Profile Info Card */}
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Profile Information
                                    </h3>

                                    <div className="flex flex-col md:flex-row gap-6">

                                        {/* Profile Image */}
                                        <div className="md:w-1/3">
                                            <div
                                                onClick={handleClick}
                                                className="aspect-square w-full max-w-[200px] mx-auto relative cursor-pointer"
                                            >
                                                <input
                                                    type="file"
                                                    ref={inputRef}
                                                    onChange={handleFile}
                                                    accept="image/*"
                                                    className="hidden"
                                                />

                                                <img
                                                    src={
                                                        profilePic
                                                            ? profilePic
                                                            : "https://placehold.co/600x400?text=No+Image"
                                                    }
                                                    alt="Profile"
                                                    className="rounded-full w-full h-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
                                                >
                                                    <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Profile Form */}
                                        <div className="md:w-2/3">
                                            <form
                                                onSubmit={handleSubmit(updateProfile)}
                                                className="space-y-4"
                                            >

                                                {/* Name */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Full Name
                                                    </label>

                                                    <input
                                                        {...register("name", {
                                                            required: "Name is required"
                                                        })}
                                                        type="text"
                                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-color"
                                                    />

                                                    {errors.name && (
                                                        <p className="text-red-400 text-sm">
                                                            {errors.name.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email Address
                                                    </label>

                                                    <input
                                                        {...register("email")}
                                                        type="email"
                                                        readOnly
                                                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500"
                                                    />
                                                </div>

                                                {/* Bio */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Bio
                                                    </label>

                                                    <textarea
                                                        {...register("bio")}
                                                        rows={3}
                                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-color"
                                                    />
                                                </div>

                                                {/* Location */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Location
                                                    </label>

                                                    <input
                                                        {...register("location")}
                                                        type="text"
                                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-color"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-secondary-color"
                                                >
                                                    Save Changes
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;