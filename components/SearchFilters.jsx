import { useEffect, useState } from 'react';
import { Flex, Box, Select, Text, Input, Spinner, Icon, Button, filter } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { MdCancel } from 'react-icons/md';
import Image from "next/image";

import { filterData, getFilterValues } from '../utils/filterData';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);

    const router = useRouter()

    const searchProperties = (filterValues) => {
        
        // update the search values after every search result is obtained
        // if the url is sent to another browser/client the same values will be populated everywhere
        // TO UPDATE URL, write the snipet

        const path = router.pathname;
        const { query } = router; //get query from the router

        const values = getFilterValues(filterValues);


        values.forEach((item) => {
            if (item.value && filterValues?.[item.name]){
            query[item.name] = item.value
            }
        })

        router.push({ pathname: path, query })

    }

    return ( // return a Flex component to render the map function over the filterData
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map((filter) => ( // for each filtrer render a box
                <Box key={filter.queryName}>
                    <Select 
                        placeholder={filter.placeholder}
                        w="fit-content"
                        p="2"
                        onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                    >

                    {/* Now the field are only populated with place holders so to see the filterable data, we implement the 
                    following lines of code */}
                    {filter?.items?.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.value}
                        </option>
                    ))}
                    
                    </Select>
                    
                </Box>
            ))}
        </Flex>
    )
}
export default SearchFilters;