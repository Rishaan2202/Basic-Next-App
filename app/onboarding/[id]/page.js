"use client"

import React, { use, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { addCountry } from '@/app/actions/add_country';
import '@/app/globals.css'

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Democratic Republic)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast (Côte d'Ivoire)", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City (Holy See)", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const Onboarding = ({ params }) => {

    const modalRef = useRef(null)

    const [page, setPage] = useState(0)
    const [country, setCountry] = useState("")
    const [error, setError] = useState(false)

    const { id } = use(params)

    const router = useRouter()

    function showError() {
        modalRef.current?.showModal()
    }

    function hideError() {
        modalRef.current?.close()
    }

    if (page === 0) {
        return (
            <div className='fixed inset-0 grid place-items-center'>
                <div className='flex flex-col items-center justify-centre bg-[var(--black)] text-[var(--blue)] w-fit p-3 rounded-lg'>
                    <h1 className='text-5xl m-2'>Heya! Welcome to Hackalympics!</h1>
                    <p className='text-xl text-[var(--red)]'>Let's get you onboard!</p>
                    <button className='bg-[var(--yellow)] text-black mt-4 m-2 p-2 rounded hover:bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer' onClick={() => setPage(1)}>Hop in ➜</button>
                </div>
            </div>
        )
    } else if (page === 1) {
        return (
            <div className='fixed inset-0 grid place-items-center'>

                <dialog ref={modalRef} className=' left-1/2 top-4/5 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--black)] text-[var(--red)] rounded-lg p-4'>
                    <div>
                        <p>Select a country to continue</p>
                    </div>
                </dialog>

                <div className='flex flex-col items-center justify-centre bg-[var(--black)] text-[var(--blue)] w-fit p-3 rounded-lg'>
                    <h1 className='text-5xl m-2'>Select Your country</h1>
                    <p className='text-xl text-[var(--red)]'>Select the country that you want to participate for in this Hackathon.</p>
                    <select className='bg-[var(--green)] text-black rounded m-2 p-2 text-xl' onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <div>
                        <button className='bg-[var(--yellow)] w-[100px] text-black mt-4 m-2 p-2 rounded hover:bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer' onClick={() => setPage(0)}>← Previous</button>
                        <button id='countryNext' className='bg-[var(--yellow)] w-[100px] text-black mt-4 m-2 p-2 rounded hover:bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer' onClick={() => {
                            if (country === "") {
                                showError()
                                setTimeout(() => {
                                    hideError()
                                }, 1000)
                            } else {
                                setPage(2)
                            }
                        }
                        }>Next →</button>
                    </div>
                </div>
            </div >
        )
    } else if (page === 2) {
        return (
            <div className='fixed inset-0 grid place-items-center'>
                <div className='flex flex-col items-center justify-centre bg-[var(--black)] text-[var(--blue)] w-fit p-3 rounded-lg'>
                    <h1 className='text-5xl m-2'>Thanks!</h1>
                    <p className='text-xl text-[var(--red)]'>Great! Now you'll be making projects and earn points for {country}!</p>
                    <div>
                        <button className='bg-[var(--yellow)] w-[100px] text-black mt-4 m-2 p-2 rounded hover:bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer' onClick={() => setPage(1)}>← Previous</button>
                        <button className='bg-[var(--yellow)] w-[120px] text-black mt-4 m-2 p-2 rounded hover:bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer' onClick={() => {
                            addCountry(id, country);
                            router.push('/home');
                        }}>Start Building</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Onboarding