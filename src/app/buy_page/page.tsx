/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any*/
'use client';
import Loading from '@/components/loading';
import { useLoading } from '@/hooks/useLoading';
import { propertyReferenceData } from '@/data/buy_page_data';
import { usePageContext } from '@/context/page-context';
import Card from '@/components/card';
import { Fragment, useEffect, useState } from 'react';
import Button from '@/components/button';
import ContactUs from '@/components/contact_information';
import PropertyReference from '@/components/propertyReference';
//import HouseFrame from '@/components/house-frame';
import imgSample from '@/assets/assets.png';
//import { cardDataArray } from '@/data';
import { toast } from 'react-hot-toast';
//import { GET_REQUEST } from '@/utils/requests';
import { URLS } from '@/utils/URLS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { BriefType } from '@/types';
import { usePathname, useRouter } from "next/navigation";

//type CardData = { header: string; value: string }[];

export default function Rent() {
  const router = useRouter();
  const pathname = usePathname();
  const [usageOption, setUsageOption] = useState("");

  const isLoading = useLoading();
  const {
    isContactUsClicked,
    rentPage,
    setRentPage,
    isModalOpened,
    selectedBriefs,
    removeBrief,
    addBrief,
  } = usePageContext();
  const [found, setFound] = useState({
    isFound: false,
    count: 0,
  });
  const [isSelectedBriefClicked, setIsSelectedBriefClicked] =
    useState<boolean>(false);
  const [text, setText] = useState<string>('View selected Brief');

  const [properties, setProperties] = useState<any[]>([]);
  const [isFetchingData, setFetchingData] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');


  useEffect(() => {
    // Check sessionStorage for the previous page
    const previousPage = sessionStorage.getItem("previousPage");
  
    if (previousPage === "/joint_ventures") {
      setUsageOption("Joint Venture");
    }
    console.log("Previous page: ", previousPage);

  
    // Update the previous page in sessionStorage
    // sessionStorage.setItem("previousPage", pathname);
  }, [pathname]);

  const viewSelectedBrief = () => {
    if (text === 'View selected Brief') {
      setIsSelectedBriefClicked(true);
      setText('< Back');
    } else if (text === '< Back') {
      setIsSelectedBriefClicked(!isSelectedBriefClicked);
      setText('View selected Brief');
    }
  };

  useEffect(() => {
    console.log(selectedBriefs);
  }, [selectedBriefs]);

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     setFetchingData(true);
  //     try {
  //       // const response = await GET_REQUEST(URLS.BASE + '/properties/sell/all');
  //       const response = await fetch(URLS.BASE + '/properties/sell/all');
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         setFetchingData(false);
  //         setProperties(data);
  //       } else {
  //         setFetchingData(false);
  //         setErrMessage('Failed to fetch data');
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setFetchingData(false);
  //     }
  //   };
  //   fetchAllData();
  // }, []);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAllData = async () => {
      setFetchingData(true);
      try {
        const response = await fetch(URLS.BASE + '/properties/sell/all', {
          signal,
        });

        if (!response.ok) {
          setErrMessage('Failed to fetch data');
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setProperties(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setErrMessage(err.message || 'An error occurred');
        }
      } finally {
        setFetchingData(false);
      }
    };

    fetchAllData();

    return () => {
      controller.abort(); // Cleanup to prevent memory leaks
    };
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('selectedBriefs');

    if (!data) return;
    try {
      const parsedData: BriefType[] = JSON.parse(data);

      if (!Array.isArray(parsedData) || parsedData.length === 0) return;

      parsedData.forEach((item) => addBrief(item));
    } catch (error) {
      console.error('Error parsing selectedBriefs from localStorage:', error);
    }
  }, []);

  if (isLoading) return <Loading />;
  return (
    <Fragment>
      <section
        className={`w-full bg-[#EEF1F1] flex justify-center items-center ${
          (isContactUsClicked ||
            rentPage.isSubmitForInspectionClicked ||
            isModalOpened) &&
          'filter brightness-[30%] transition-all duration-500'
        }`}>
        <div className='container min-h-[800px] py-[48px] px-[20px] lg:px-[0px] flex flex-col items-center gap-[40px]'>
          <h2 className='lg:text-[40px] lg:leading-[64px] text-[30px] leading-[41px] text-center text-[#09391C]  font-semibold font-display'>
            Enter Your{' '}
            <span className='text-[#8DDB90] font-display'>
              Property Preference
            </span>
          </h2>
          <PropertyReference
            found={found}
            setFound={setFound}
            setAllCards={setProperties}
            usageOption={usageOption}
            propertyReferenceData={propertyReferenceData}
          />
          {/**All cards for isnpection */}
          {
            <div className='w-full flex lg:flex-row flex-col lg:w-[1154px] gap-[15px] overflow-hidden'>
              <div className='flex flex-col gap-2 w-full'>
                {found.isFound && (
                  <div className='flex justify-between'>
                    {' '}
                    <h2 className='text-[18px] leading-[28.8px] text-[#1976D2] font-semibold'>
                      {found.count} match Found
                    </h2>
                    <h2 className='flex gap-[5px] lg:hidden'>
                      <span
                        onClick={viewSelectedBrief}
                        className='text-base leading-[25.6px] font-medium text-[#FF3D00]'>
                        {text}
                      </span>
                    </h2>
                  </div>
                )}
                <div
                  className={`${
                    [...selectedBriefs].length !== 0
                      ? 'lg:w-[858px]'
                      : 'lg:w-[1154px]'
                  } w-full flex flex-col gap-[21px] lg:grid ${
                    [...selectedBriefs].length !== 0
                      ? 'lg:grid-cols-3'
                      : 'lg:grid-cols-4'
                  } ${
                    isSelectedBriefClicked ? 'hidden lg:grid' : 'flex lg:grid'
                  }`}>
                  {properties?.map((property, idx: number) => (
                    <Card
                      images={Array(12).fill(imgSample)}
                      onClick={() => {
                        addBrief(property);
                        if (selectedBriefs.has(property)) {
                          return toast.success('Already added for inspection');
                        }
                        toast.success('Successfully added for inspection');
                      }}
                      cardData={[
                        {
                          header: 'Property Type',
                          value: property.propertyType,
                        },
                        {
                          header: 'Price',
                          value: `₦${Number(property.price).toLocaleString()}`,
                        },
                        {
                          header: 'Bedrooms',
                          value:
                            property.propertyFeatures?.noOfBedrooms || 'N/A',
                        },
                        {
                          header: 'Location',
                          value: `${property.location.state}, ${property.location.localGovernment}`,
                        },
                        {
                          header: 'Documents',
                          value: `<ol class='' style='list-style: 'dics';'>${property.docOnProperty.map(
                            (item: { _id: string; docName: string }) =>
                              `<li key={${item._id}>${item.docName}</li>`
                          )}<ol>`,
                        },
                      ]}
                      key={idx}
                    />
                  ))}
                </div>
                {isFetchingData && (
                  <div className='container min-h-[300px] flex items-center justify-center'>
                    <p>Loading...</p>
                  </div>
                )}
                {errMessage !== '' && (
                  <div className='container min-h-[300px] flex items-center justify-center'>
                    <p className='text-base font-medium text-center'>
                      {errMessage}, check your internet connection and{' '}
                      <span
                        onClick={() => {
                          router.refresh();
                        }}>
                        reload
                      </span>{' '}
                      <FontAwesomeIcon icon={faWifi} />
                    </p>
                  </div>
                )}
              </div>

              {[...selectedBriefs].length !== 0 && (
                <div
                  className={`lg:flex flex-col lg:border-l-[1px] lg:border-[#A8ADB7] lg:pl-[20px] ${
                    isSelectedBriefClicked ? 'flex lg:flex' : 'hidden lg:flex'
                  }`}>
                  <h2 className='text-[24px] leading-[38.4px] text-[#09391C] font-display font-semibold'>
                    Submit for inspection
                  </h2>
                  <div className='lg:w-[266px] w-full flex flex-col gap-[14px]'>
                    {[...selectedBriefs].map((brief, idx: number) => (
                      <Card
                        images={Array(12).fill(imgSample)}
                        onClick={() => {
                          removeBrief(brief);

                          localStorage.clear();
                          toast.success('Removed successfully');
                        }}
                        cardData={[
                          {
                            header: 'Property Type',
                            value: brief?.propertyType,
                          },
                          {
                            header: 'Price',
                            value: `₦${Number(brief?.price).toLocaleString()}`,
                          },
                          {
                            header: 'Bedrooms',
                            value:
                              brief?.propertyFeatures?.noOfBedrooms || 'N/A',
                          },
                          {
                            header: 'Location',
                            value: `${brief?.location.state}, ${brief?.location.localGovernment}`,
                          },
                          {
                            header: 'Documents',
                            value: `<ol>${brief?.docOnProperty.map(
                              (item: { _id: string; docName: string }) =>
                                `<li key={${item._id}>${item.docName}</li>`
                            )}<ol>`,
                          },
                        ]}
                        isRed={true}
                        key={idx}
                      />
                    ))}
                  </div>
                  <Button
                    green={true}
                    value='Submit'
                    onClick={() => {
                      setRentPage({ isSubmitForInspectionClicked: true });
                    }}
                    className='py-[12px] px-[24px] h-[64px] text-[#FFFFFF] text-base leading-[25.6px] font-bold mt-6'
                  />
                </div>
              )}
            </div>
          }
        </div>
      </section>
      {rentPage.isSubmitForInspectionClicked && <ContactUs />}
    </Fragment>
  );
}
