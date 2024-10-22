import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Fetches the list of resumes for the user.
   */
  const GetResumesList = () => {
    setIsLoading(true); // Set loading to true while fetching
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeList(resp.data.data || []); // Ensure the response is an array or default to an empty array
      })
      .catch((err) => {
        console.error('Error fetching resumes:', err);
        setResumeList([]); // Handle error and set as empty array
      })
      .finally(() => {
        setIsLoading(false); // Stop loading after fetch
      });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating an AI resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />
        {isLoading ? (
          // Loading state
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className="h-[280px] rounded-lg bg-slate-200 animate-pulse" />
          ))
        ) : resumeList.length > 0 ? (
          // Resume list when data is available
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          // Empty state when no resumes are available
          <p>No resumes found. Start by adding a new resume!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
