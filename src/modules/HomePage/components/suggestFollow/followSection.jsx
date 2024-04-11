import React from 'react'

const FollowSection = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="text-content font-bold">Suggested For you</div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5 items-center'>
                <img className='w-12 rounded-full' src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="" />
                <div>
                <div className="text-lg font-medium">User Name</div>
                <div className="text-sm font-semibold text-secondary">Followed By User Name</div>
                </div>
                </div>
                <div className="text-sm font-bold text-primary cursor-pointer">Follow</div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5 items-center'>
                <img className='w-12 rounded-full' src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="" />
                <div className="text-sm font-medium">User Name</div>
                </div>
                <div className="text-sm font-bold text-primary cursor-pointer">Follow</div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5 items-center'>
                <img className='w-12 rounded-full' src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="" />
                <div className="text-sm font-medium">User Name</div>
                </div>
                <div className="text-sm font-bold text-primary cursor-pointer">Follow</div>
            </div>
        </div>
    )
}

export default FollowSection
