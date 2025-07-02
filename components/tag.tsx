'use client';

import { useState } from "react";
import { ChevronDown, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const Calendar = ({ onDateSelect, selectedDate }:{onDateSelect:String, selectedDate:String}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    
    const formatDate = (year:String, month:String, day) => {
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };
    
    const isToday = (year, month, day) => {
        const today = new Date();
        return year === today.getFullYear() && 
               month === today.getMonth() && 
               day === today.getDate();
    };
    
    const isPastDate = (year, month, day) => {
        const today = new Date();
        const dateToCheck = new Date(year, month, day);
        today.setHours(0, 0, 0, 0);
        return dateToCheck < today;
    };
    
    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        
        const days = [];
        

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const isCurrentDay = isToday(year, month, day);
            const isPast = isPastDate(year, month, day);
            const dateString = formatDate(year, month, day);
            const isSelected = selectedDate === dateString;
            
            days.push(
                <button
                    key={day}
                    onClick={() => !isPast && onDateSelect(dateString)}
                    disabled={isPast}
                    className={`w-8 h-8 text-sm rounded hover:bg-blue-100 ${
                        isSelected ? 'bg-blue-500 text-white' :
                        isCurrentDay ? 'bg-blue-200' :
                        isPast ? 'text-gray-400 cursor-not-allowed' :
                        'hover:bg-gray-100'
                    }`}
                >
                    {day}
                </button>
            );
        }
        
        return days;
    };
    
    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };
    
    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };
    
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
            <div className="flex justify-between items-center mb-4">
                <button onClick={previousMonth} className="text-gray-600 hover:text-black">
                    ←
                </button>
                <span className="font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={nextMonth} className="text-gray-600 hover:text-black">
                    →
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="w-8 h-8 text-xs font-medium text-gray-600 flex items-center justify-center">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
            </div>
        </div>
    );
};

const SearchBar = () => {
    const [checkIn, setCheckIn] = useState("Date");
    const [checkOut, setCheckOut] = useState("Date");
    const [persons, setPersons] = useState('Select');
    const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
    const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
    const [showPersonDropdown, setShowPersonDropdown] = useState(false);

    const router = useRouter();

    const personOptions = [1, 2, 3, 4, 5, 6, 7, 8];

    const handleDateSelect = (date, type) => {
        if (type === 'checkin') {
            setCheckIn(date);
            setShowCheckInCalendar(false);
        } else {
            setCheckOut(date);
            setShowCheckOutCalendar(false);
        }
    };

    const handlePersonSelect = (count) => {
        setPersons(count);
        setShowPersonDropdown(false);
    };

    return (
        <div className="w-full max-w-screen-md flex px-6 py-4 bg-white rounded text-black relative cursor-pointer">

            <div className="flex-1 border-r-2 border-black relative ">
                <button 
                    className="w-full text-left"
                    onClick={() => {
                        setShowCheckInCalendar(!showCheckInCalendar);
                        setShowCheckOutCalendar(false);
                        setShowPersonDropdown(false);
                    }}
                >
                    <div className="text-sm cursor-pointer">
                        Check in
                    </div>
                    <div className="text-lg mt-2 ">
                        {checkIn}
                    </div>
                </button>
                
                {showCheckInCalendar && (
                    <div className="absolute top-full left-0 mt-2 z-50">
                        <Calendar 
                            onDateSelect={(date) => handleDateSelect(date, 'checkin')}
                            selectedDate={checkIn}
                        />
                    </div>
                )}
            </div>


            <div className="flex-1 px-4 min-w-max border-r-2 border-black relative ">
                <button 
                    className="w-full text-left"
                    onClick={() => {
                        setShowCheckOutCalendar(!showCheckOutCalendar);
                        setShowCheckInCalendar(false);
                        setShowPersonDropdown(false);
                    }}
                >
                    <div className="text-sm">
                        Check out
                    </div>
                    <div className="text-lg mt-2">
                        {checkOut}
                    </div>
                </button>

                {showCheckOutCalendar && (
                    <div className="absolute top-full left-0 mt-2 z-50">
                        <Calendar 
                            onDateSelect={(date) => handleDateSelect(date, 'checkout')}
                            selectedDate={checkOut}
                        />
                    </div>
                )}
            </div>


            <div className="flex-1 px-8 max-w-fit relative">
                <button 
                    className="w-full text-left"
                    onClick={() => {
                        setShowPersonDropdown(!showPersonDropdown);
                        setShowCheckInCalendar(false);
                        setShowCheckOutCalendar(false);
                    }}
                >
                    <div className="text-sm flex items-center gap-1">
                        <Users size={14} />
                        Person
                        <ChevronDown size={14} />
                    </div>
                    <div className="text-lg mt-2">
                        {
                            persons === 'Select'
                            ? persons
                            : `${persons} Person${persons !== 1 ? 's' : ''}`
                        }
                        </div>

                </button>

                {showPersonDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                        {personOptions.map((count) => (
                            <button
                                key={count}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                                onClick={() => handlePersonSelect(count)}
                            >
                                {count} Person{count !== 1 ? 's' : ''}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 flex max-w-fit">
                <button 
                    className="rounded bg-black text-white flex-1 px-8"
                    onClick={() => {
                        setShowCheckInCalendar(false);
                        setShowCheckOutCalendar(false);
                        setShowPersonDropdown(false);
                        if(checkIn !== 'Date' && checkOut !== 'Date' && persons !== 'Select'){
                            router.push('/explore');
                        }
                    }}
                >
                    Book Now
                </button> 
            </div>

            {(showCheckInCalendar || showCheckOutCalendar || showPersonDropdown) && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowCheckInCalendar(false);
                        setShowCheckOutCalendar(false);
                        setShowPersonDropdown(false);
                    }}
                />
            )}
        </div>
    );
};

export default function Tag() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-full py-20 flex flex-col items-center mx-20 px-10">
                <div className="text-6xl text-white w-1/2 text-center mb-6">
                    Your Perfect Stay, Just a Click Away.
                </div>
                <div className="my-6 w-1/2 text-xl text-center text-gray-200">
                    Find your perfect stay with ease explore a wide range of rooms, grab great deals and book your ideal getaway today
                </div>
                <SearchBar />
            </div>
        </div>
    );
}