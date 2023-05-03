import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from '../axios'

const AddRole = () => {

    const [role, setRole] = useState("")
    const [selected, setSelected] = useState([])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        axios.get(`/role/get-role`)
            .then((res) => {
                console.log(res.data)
                setSelected(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.post(`/role/add-role`, { role: role, parent: selected })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <div className='flex justify-center items-center w-full h-[100%]'>
            <div className='w-[30%]'>
                <h1 className='text-[30px] font-medium mt-[50px]'>Add New Role</h1>
                <form onSubmit={handleFormSubmit} className='mt-[20px]'>
                    <div className='flex'>
                        <input
                            type="text"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 mb-[10px]"
                            placeholder="Role"
                        />
                    </div>
                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <div className="relative flex mt-2">
                                    <Listbox.Button className="relative w-[100%] cursor-default rounded-md bg-white py-1.5 pl-2 pr-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
                                        <span className="flex items-center">
                                            <span className="ml-1 block truncate">{selected.length !== 0 ? selected[0].name : 'Under'}</span>
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 max-h-56 w-[100%] mt-[40px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {selected.map((person) => (
                                                <Listbox.Option
                                                    key={person._id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-gray-800 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={person}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {person.name}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-gray-800',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <div className='mt-[10px]'>
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRole
