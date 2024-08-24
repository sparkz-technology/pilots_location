/* eslint-disable react/prop-types */
import { memo } from "react";

const PilotList = memo(({ pilots, onLocatePilot, onBack }) => (
    <div className="bg-yellow-100 p-4 rounded-lg shadow-lg w-full md:w-1/3">
        <button
            onClick={onBack}
            className="font-bold"
        >
            Back
        </button>
        <h2 className="text-xl font-semibold my-4">Pilots List</h2>
        {Array.isArray(pilots) && pilots.map(pilot => (
            <div key={pilot._id} className="flex items-center gap-4 mb-4">
                <img
                    src={'https://ui-avatars.com/api/?name=' + pilot?.name}
                    alt={pilot?.name}
                    className="w-16 h-16 rounded-full"
                />
                <div className='w-[70%]'>
                    <h3 className="text-lg font-semibold">{pilot?.name}</h3>
                    <p>Experience: {pilot?.workExperience} years</p>
                </div>
                <button
                    onClick={() => onLocatePilot(pilot)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Locate
                </button>
            </div>
        ))}
    </div>
));

PilotList.displayName = 'PilotList';

export default PilotList;