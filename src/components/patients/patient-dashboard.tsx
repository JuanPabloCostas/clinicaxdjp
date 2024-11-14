import { AddPatientFlow } from "./types";

interface PatientDashboardProps {
    setState: (state: AddPatientFlow) => void;
}

export const PatientDashboard = ({ setState }: PatientDashboardProps) => {
    return (
        <div>
            <div className="w-[61rem] flex flex-col items-start justify-start z-[1]">
        				<div className="self-stretch bg-gray-100 overflow-hidden flex flex-col items-start justify-start py-[1.5rem] px-[0rem] gap-[1.5rem]">
          					<div className="self-stretch flex flex-row items-center justify-between">
            						<div className="flex flex-row items-center justify-start gap-[1rem]">
              							<div className="flex flex-row items-center justify-start gap-[0.25rem]">
                								<div className="relative leading-[2.5rem] font-semibold">Patient Management Dashboard</div>
                								<img className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0" alt="" src="caret-down.svg" />
              							</div>
              							<div className="rounded-lg bg-teal border-gray-400 border-[1.5px] border-solid flex flex-row items-center justify-center py-[0.25rem] px-[0.5rem] gap-[0.5rem] text-center text-[0.938rem]">
                								<div className="w-[0.375rem] relative rounded-[50%] bg-forestgreen-200 h-[0.375rem]" />
                								<div className="relative leading-[1.25rem] font-medium overflow-hidden text-ellipsis whitespace-nowrap">Operational</div>
              							</div>
            						</div>
            						<div className="bg-white flex flex-row items-start justify-start gap-[0.75rem] text-[0.938rem] text-white">
              							<div className="rounded-lg bg-forestgreen-100 flex flex-row items-center justify-center py-[0.5rem] px-[1rem]">
                								<div className="relative leading-[1.25rem] font-medium">Share</div>
              							</div>
              							<div className="rounded-lg bg-gray-200 border-darkolivegreen border-[1.5px] border-solid flex flex-row items-center justify-center p-[0.5rem]">
                								<img className="w-[1.25rem] relative h-[1.25rem]" alt="" src="div.svg" />
              							</div>
            						</div>
          					</div>
          					<div className="flex flex-row items-center justify-start gap-[0.75rem] text-[0.938rem] text-darkslategray-100 font-outfit">
            						<div className="flex flex-row items-start justify-start">
              							<img className="w-[2rem] relative rounded-980xl h-[2rem] overflow-hidden shrink-0 object-cover mix-blend-normal z-[3]" alt="" src="profile.png" />
              							<img className="w-[2rem] relative rounded-980xl h-[2rem] overflow-hidden shrink-0 object-cover mix-blend-normal z-[2] ml-[-0.375rem]" alt="" src="profile.png" />
              							<img className="w-[2rem] relative rounded-980xl h-[2rem] overflow-hidden shrink-0 object-cover mix-blend-normal z-[1] ml-[-0.375rem]" alt="" src="profile.png" />
              							<img className="w-[2rem] relative rounded-980xl h-[2rem] overflow-hidden shrink-0 object-cover mix-blend-normal z-[0] ml-[-0.375rem]" alt="" src="profile.png" />
            						</div>
            						<div className="flex flex-row items-center justify-start gap-[0.25rem]">
              							<div className="relative leading-[1.25rem]">Dr. Alice, Dr. Bob</div>
              							<div className="relative leading-[1.25rem]">+12 others</div>
            						</div>
          					</div>
        				</div>
        				<div className="self-stretch bg-gray-100 flex flex-row items-start justify-start py-[1.5rem] px-[0rem] gap-[1rem] text-[0.938rem]">
          					<div className="flex-1 flex flex-col items-start justify-start">
            						<div className="self-stretch flex flex-row items-center justify-start py-[0.25rem] px-[0rem] text-[0.813rem] text-darkslategray-100">
              							<div className="flex flex-row items-center justify-start">
                								<div className="relative leading-[1rem] font-medium">Patient Name</div>
                								<img className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0" alt="" src="caret-down.svg" />
              							</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">John Doe</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Jane Smith</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Mary Johnson</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">James Brown</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Patricia Davis</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Michael Wilson</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Linda Martinez</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Robert Anderson</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Barbara Thomas</div>
            						</div>
          					</div>
          					<div className="flex flex-col items-start justify-start">
            						<div className="self-stretch flex flex-row items-center justify-start py-[0.25rem] px-[0rem] text-[0.813rem] text-darkslategray-100">
              							<div className="flex flex-row items-center justify-start">
                								<div className="relative leading-[1rem] font-medium">Age</div>
                								<img className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0" alt="" src="caret-down.svg" />
              							</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">45</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">34</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">29</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">52</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">47</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">38</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">31</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">49</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">56</div>
            						</div>
          					</div>
          					<div className="flex flex-col items-start justify-start">
            						<div className="self-stretch flex flex-row items-center justify-start py-[0.25rem] px-[0rem] text-[0.813rem] text-darkslategray-100">
              							<div className="flex flex-row items-center justify-start">
                								<div className="relative leading-[1rem] font-medium">Condition</div>
                								<img className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0" alt="" src="caret-down.svg" />
              							</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Diabetes</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Hypertension</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Asthma</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Arthritis</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">COPD</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Heart Disease</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Kidney Disease</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Liver Disease</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">Cancer</div>
            						</div>
          					</div>
          					<div className="flex flex-col items-start justify-start">
            						<div className="self-stretch flex flex-row items-center justify-start py-[0.25rem] px-[0rem] text-[0.813rem] text-darkslategray-100">
              							<div className="flex flex-row items-center justify-start">
                								<div className="relative leading-[1rem] font-medium">Next Appointment</div>
                								<img className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0" alt="" src="caret-down.svg" />
              							</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-01</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-02</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-03</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-04</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-05</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-06</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-07</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-08</div>
            						</div>
            						<div className="self-stretch border-darkslategray-200 border-t-[1.5px] border-solid flex flex-row items-center justify-start py-[1rem] px-[0rem]">
              							<div className="relative leading-[1.25rem] overflow-hidden text-ellipsis whitespace-nowrap">2023-10-09</div>
            						</div>
          					</div>
        				</div>
        				<div className="self-stretch flex flex-row items-center justify-center text-[1rem] text-default-800">
          					<div className="flex flex-row items-start justify-start gap-[0.5rem]">
            						<div className="w-[2rem] rounded bg-default-100 h-[2rem] flex flex-row items-center justify-center">
              							<div className="flex flex-row items-center justify-start pt-[0.062rem] pb-[0rem] pl-[0rem] pr-[0.25rem]">
                								<img className="w-[0rem] relative max-w-full overflow-hidden h-[0.688rem] object-contain" alt="" src="Arrow 1.svg" />
              							</div>
            						</div>
            						<div className="w-[2rem] rounded bg-selection-menu h-[2rem] flex flex-row items-center justify-center text-main-green">
              							<div className="relative">1</div>
            						</div>
            						<div className="w-[2rem] rounded bg-default-100 h-[2rem] flex flex-row items-center justify-center">
              							<div className="relative">2</div>
            						</div>
            						<div className="w-[2rem] rounded bg-default-100 h-[2rem] flex flex-row items-center justify-center">
              							<div className="relative">3</div>
            						</div>
            						<div className="w-[2rem] rounded bg-default-100 h-[2rem] flex flex-row items-center justify-center">
              							<div className="relative">4</div>
            						</div>
            						<div className="w-[2rem] rounded bg-default-100 h-[2rem] flex flex-row items-center justify-center">
              							<div className="relative">5</div>
            						</div>
            						<div className="w-[2rem] rounded bg-default-100 h-[2rem] flex flex-row items-center justify-center">
              							<div className="flex flex-row items-center justify-start pt-[0.062rem] pb-[0rem] pl-[0.25rem] pr-[0rem]">
                								<img className="w-[0rem] relative max-w-full overflow-hidden h-[0.688rem]" alt="" src="Arrow 1.svg" />
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<div className="rounded-lg bg-forestgreen-100 flex flex-row items-center justify-center py-[0.5rem] px-[1rem] gap-[1rem] z-[0] text-[0.938rem] text-white">
        				<img className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0" alt="" src="carbon:add.svg" />
        				<div className="w-[8.063rem] relative leading-[1.25rem] font-medium inline-block shrink-0">Add Appointment</div>
      			</div>
            <h1>Patient Dashboard</h1>
            <button onClick={() => setState("registration")}>Register Patient</button>
        </div>
    )
}