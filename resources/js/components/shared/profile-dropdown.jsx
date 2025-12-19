import React from 'react'
import { Link } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ProfileDropdown = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='lg:hidden px-5 outline-none'>Menu</DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white space-y-1 pb-3 flex flex-col">
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={"/profile"} aria-label='profile link'><DropdownMenuItem>Profil</DropdownMenuItem></Link>
                    <Link href={"/history-order"}  aria-label='order link'><DropdownMenuItem>Buyurtmalar</DropdownMenuItem></Link>
                    <Link href={"/address"} aria-label='Addres link'><DropdownMenuItem>Manzil</DropdownMenuItem></Link>
                    <Link href={"/address-add"} aria-label='Add Addres link'><DropdownMenuItem>Manzil qo'shish</DropdownMenuItem></Link>
                    <Link href={"/edit-password"} aria-label='edit pasword link'><DropdownMenuItem>Parol</DropdownMenuItem></Link>
                    <Link href={"/"} aria-label='log out link'><DropdownMenuItem>Chiqish</DropdownMenuItem></Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileDropdown
