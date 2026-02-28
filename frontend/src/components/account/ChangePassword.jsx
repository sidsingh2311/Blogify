import React from 'react'
import Layout from '../common/Layout'
import Sidebar from './Sidebar'
import { useForm } from 'react-hook-form'
import axios from "../common/axiosConfig"
import toast from 'react-hot-toast'

const ChangePasword = () => { 
     
    const {register,handleSubmit,watch,formState: {errors},reset} = useForm(); 

    const updatePassword = async (formData) => {
         try{
            const {message,data,success} = await axios.put("/users/change-password",formData);
            if(success) {
                reset();
                toast.success(message);
            }
         }
         catch(error) {
             if(error.response.status === 400 || error.response.status === 404) {
                toast.error(error?.response?.data?.message);
             }
             else {
                toast.error(error?.message); 
             }
         }
    } 

    const newPassword = watch("newPassword");

  return (
    <Layout>
    <div className="py-8">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <Sidebar/>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="space-y-6">                             
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                                <form onSubmit={handleSubmit(updatePassword)}>
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <input 
                                                {
                                                    ...register("oldPassword",{
                                                        required: "The old password is required"
                                                    })
                                                }
                                                
                                                type="password"
                                              
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                                                placeholder="Enter your current password"
                                            /> 
                                            {
                                                errors.oldPasswords && <p className="text-red-400">{errors?.oldPassword?.message}</p>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                    {
                                                    ...register("newPassword",{
                                                        required: "The new password is required"
                                                    })
                                                }
                                                
                                               
                                                type="password"
                                                
                                                minLength={8}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                                                placeholder="Enter your new password"
                                            /> 
                                             {
                                                errors.newPasswords && <p className="text-red-400">{errors?.newPassword?.message}</p>
                                            }
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                      {
                                                    ...register("confirmPassword",{
                                                        required: "Please confirm your password",
                                                        validate: (value) => {
                                                             return newPassword === value || "Password do not match"
                                                        }
                                                    })
                                                }
                                                
                                                type="password"
                                                required
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                                focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                                                placeholder="Confirm your new password"
                                            />
                                             {
                                                errors.confirmPasswords && <p className="text-red-400">{errors?.confirmPassword?.message}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>      
        </Layout>
    
  )
}

export default ChangePasword;