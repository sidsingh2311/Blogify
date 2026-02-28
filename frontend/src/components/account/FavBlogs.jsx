import React from "react";
import Layout from "../common/Layout";
import Sidebar from "./Sidebar";
import { HeartIcon } from "@heroicons/react/24/solid";
import axios from "../common/axiosConfig";
import { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";

const FavBlog = () => {

    const [fav, setFav] = useState([]);

    const getFavBlogs = async () => {
        try {
            const { data, message, success } = await axios.get("/blogs/get-favourite-blogs")
            if (success) {
                setFav(data.favourites);
            }
        }
        catch (error) {
            console.log(error || "something went wrong");
        }
    }

    const removeFromFavList = async (blogId) => {
        try {
            const { data, message, success } = await axios.post("/blogs/add-to-favourite", { blogId: blogId })
            if (success) {
                const newFav = fav.filter((favList) => favList?.blog?._id !== blogId);
                setFav(newFav);
                toast.success(message);
            }
        }
        catch (error) {
            console.log(error || "something went wrong");
        }
    }

    useEffect(() => {
        getFavBlogs();
    }, [])

    return (
        <Layout>
            <div className="py-8">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content */}
                        <main className="flex-1">
                            <div className="space-y-6">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                        Favorite Articles
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {
                                            fav && fav.map(favList => {
                                                return (
                                                    <article className="group cursor-pointer">
                                                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">

                                                            {
                                                                favList?.blog?.image &&
                                                                <div className="relative aspect-[16/9] mb-8">
                                                                    <img
                                                                        src={favList?.blog?.image}
                                                                        alt=""
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    />
                                                                </div>
                                                            }
                                                            {

                                                                !favList?.blog?.image &&
                                                                <div className="relative aspect-[16/9] mb-8">
                                                                    <img
                                                                        src="https://placehold.co/600x400?text=No Image"
                                                                        alt=""
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    />
                                                                </div>

                                                            }



                                                            <button
                                                                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                                                                onClick={(e) => {
                                                                    removeFromFavList(favList?.blog?._id)
                                                                }}
                                                            >
                                                                <HeartIcon className="w-5 h-5 text-red-500" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                            <span>{moment(favList.createdAt).format("DD MMMM YYYY")}</span>
                                                            <span className="text-gray-300">
                                                                •
                                                            </span>
                                                            <span>{favList?.blog?.user?.name}</span>
                                                            <span className="text-gray-300">
                                                                •
                                                            </span>
                                                            <span>{favList?.blog.read_time}</span>
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600">
                                                            {favList?.blog?.title}
                                                        </h3>

                                                    </article>
                                                )
                                            })
                                        }

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

export default FavBlog;