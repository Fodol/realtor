import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react';
import {FaBed, FaBath } from 'react-icons/fa';
import {BsGridFill} from 'react-icons/bs'
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

// To obtain the details of all the properties, we write the below function to retrieve them.

const PropertyDetails = ({propertyDetails: {price, title,rentFrequency, rooms, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos}}) => (
    <Box maxWidth="1000px"  margin="auto" p="4"> 

    {/* if there are photos then we can render the images */}
    {/* if photos are available, then we pass a self closing tag "<ImageScroll />" as below script */}

    {photos && <ImageScrollbar  data={photos} />}
    <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                    <Text fontWeight="bold" fontSize="lg"> AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                </Flex>
                <Box>
                    <Avatar size="sm" src={agency?.logo?.url} />
                </Box>
            </Flex> 
            <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400" >
                {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
           <Box marginTop="2">
                    <Text fontSize="lg" marginBottom="2" fontWeight="bold" >
                        {/* {title.length > 30 ? `${title.substring(0,30)}...` : title} */}
                        {title}
                    </Text>
                    <Text lineHeight="2" color="gray.600">
                        {description}
                    </Text>
                <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between"  >
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px"  borderColor="gray.100" p="3">
                        <Text>
                            Type
                        </Text>
                        <Text fontWeight="bold">
                            {type}
                        </Text>
                    </Flex>
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px"  borderColor="gray.100" p="3">
                        <Text>
                            Purpose
                        </Text>
                        <Text fontWeight="bold">
                            {purpose}
                        </Text>
                    </Flex>
                    {/* Is there a furnishingStatus ? if yes then render the below dynamic rendering in the client */}
                    {furnishingStatus && (
                        <Flex justifyContent="space-between" w="400px" borderBottom="1px"  borderColor="gray.100" p="3">
                            <Text>
                                Furnishing Status
                            </Text>
                            <Text fontWeight="bold">
                                {furnishingStatus}
                            </Text>
                        </Flex>
                    )}
                </Flex>
            <Box>
                {/* If there are amenities listed in the property, then we extract each amenity properties and render them in the browser */}
                {/* we implement the below component */}
                {amenities.length && <Text fontSize="2x1" fontWeight="black" margingTop="5">Amenities</Text>}
                <Flex flexWrap="wrap">
                    {amenities.map((item) => (
                        item.amenities.map((amenity) => (
                        <Text 
                            fontWeight="bold"                            
                            color="blue.400"
                            fontSize="l"                            
                            p="2"
                            m="1"
                            borderRadius="5"
                            key={amenity.text}
                            >
                            { amenity.text }
                        </Text>))
                    ))}
                </Flex>
            </Box>
           </Box>
        </Box>
    </Box>
);

export default PropertyDetails;

// How do we get or fetch property details? 
// We use getServerSideProps

export async function getServerSideProps({params:{ id }}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return{
        props: {
            propertyDetails: data
        }
    }

}