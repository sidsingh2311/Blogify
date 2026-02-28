import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import axios from "../common/axiosConfig"
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from "moment";

const Blog = () => {
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const categories = [
        { name: 'All' },
        { name: 'Education' },
        { name: 'Business' },
        { name: 'Fashion' },
        { name: 'Technology' },
        { name: 'Travel' },
    ];

    // method to get the latest blogs
    const getLatestBlogs = async () => {
        try {

            let url = "/blogs/get-blogs"
            if (searchParams.get("category")) {
                url = url + "?category=" + searchParams.get("category");
            }

            const { data, message, success } = await axios.get(url);

            if (success) {
                setLatestBlogs(data?.blogs);
            }
        }
        catch (error) {
            console.log(error?.message || "something went wrong");
        }
    }

    useEffect(() => {
        getLatestBlogs();
    }, [searchParams.get("category")])


    return (
        <Layout>
            <section className="latest-blogs py-12">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">All Articles</h2>
                    </div>
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Sidebar */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                    <nav className="space-y-2">
                                        {categories.map((category) => (
                                            <Link
                                                to={`/blogs?category=${category.name.toLowerCase()}`}
                                                key={category.name}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:bg-gray-50`}
                                            >
                                                <span>{category.name}</span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <main className="lg:col-span-9">

                            {
                                !latestBlogs || latestBlogs.length === 0 &&
                                <div className="bg-gray-300 p-5 text-center">
                                    <h2 className="text-lg font-medium text-grey-900">Blogs not found</h2>
                                </div>
                            }

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {latestBlogs.map(blog => (

                                    <article key={blog._id} className="group cursor-pointer">
                                        <Link to={`/detail/${blog._id}`}>
                                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                <span>{moment(blog.createdAt).format("DD MM YYYY")}</span>
                                                <span className="text-gray-300">•</span>
                                                <span>{blog?.user?.name}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 line-clamp-2">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Blog;