import React from 'react'

const OTPStep = () => {
    return (
        <>
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

            <div className="text-center text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
            <div>
                <form action="" method="post" >
                    <div className="flex flex-col space-y-16 text-black	mt-20">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs" >
                            <div className="w-16 h-16 ">
                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                            </div>
                            <div className="w-16 h-16 ">
                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                            </div>
                            <div className="w-16 h-16 ">
                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                            </div>
                            <div className="w-16 h-16 ">
                                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5">
                            <div>
                                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                    Verify Account
                                </button>
                            </div>

                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </>

    )
}

export default OTPStep