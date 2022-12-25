import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property'
import noresult from '../assets/images/noresult.svg'
import { baseUrl, fetchApi } from '../utils/fetchApi';

// This function implements a search icon and placed an event listerning on the icon
// the filter icon is clicked the event is fired-off or executed

const Search = ({ properties }) => {
    const [ searchFilters, setSearchFilters] = useState(false); 
    
    // useState is a react hook
    // when the boolean is false, the value is assigned to searchFilters and the fuction setSearchFilters is fired-off anytime the 
    //the useState() hook's parameter has changed state.

    const router = useRouter(); // router is a nextjs module running on the react engine.

    return (
        <Box>
            <Flex
                cursor="pointer"           
                bg="gray.100"
                borderBottom="1px"         
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"    
                alignItems="center"         
                onClick={() => setSearchFilters((prevFilters)=> !prevFilters)} // toggle BSFilter Icon on and off   
                >
                    <Text> Search Properties By Filter</Text>
                    <Icon paddingLeft="2" w="7" as={BsFilter}/>
            </Flex>

            {/* Search filters should display once the BsFilter Icon is clicked and disappear when clicked for the second time*/}
            
            {searchFilters && <SearchFilters />}
            <Text fontSize="2x1" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property} key={property.id}/>)}
            </Flex>

            {/* The below script is executed if no image is found after a search function is performed*/}
            
            {properties.length === 0 && ( //meaning if there are no result during a search or no properties is returned, then render the below flex container
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt='no result' src={noresult}/>
                    <Text fontSize="2x1" marginTop="3">No Result Found</Text>
                </Flex>
            )}
        </Box>
    )
}
export default Search;

// write a function to query all the paramters or variable we need to search in the search functions
// Use the built-in function getServerSideProps instead of the getStaticProps fucntion that  fetches the data when the client get loaded.
// the getServerSideProps, function means that the data will only be available when the vistor to the page....
// the client. 

//  make a query request and send to the Search function
// obtain the values using the query functions below

export async function getServerSideProps({ query }) {  // query object is run with the properties of the object.....
    const purpose = query.purpose || 'for-rent';        //... object properties like minPrice, monRoom, rentFrequency etc
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice =  query.maxPrice || '1000000';
    const roomMin = query.roomMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax   = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || 4;

    //  make request to fetch data from the API
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=
    ${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&rentFrequency=${rentFrequency}&
    minPrice=${minPrice}&maxPrice=${maxPrice}&roomMin=${roomMin}&bathsMin=${bathsMin}&sort=${sort}
    &areaMax=${areaMax}`);

    return { // the value or properties, returned by the getServerSideProps(), is passed to the page component as props.
        // the component in our function here is the Search component.
      props: { // we fetch the data on request and return them as props objects 
        properties: data?.hits, //if data is found, we send this result 'properties' to the search function implementation as objects
      },
    };
  }