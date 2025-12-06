import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, } from '@mui/material';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import mockData from './mockData';
import StatusesCard from '../components/StatusesCard';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import FilterSearchPanel from '../components/FilterSearchPanel';
import QuickActions from '../components/QuickActions';
import PackageAppBar from '../components/PackageAppBar';
import PackageList from '../components/PackageList';


const Dashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('Date Created (Newest)');
  const [packageTypeFilter, setPackageTypeFilter] = useState('All Types');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [phoneFilter, setPhoneFilter] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/');
      return;
    }

    const loadPackages = () => {
      let storedPackages;
      try {
        storedPackages = JSON.parse(localStorage.getItem('packages'));
      } catch (error) {
        console.error('Error parsing stored packages:', error);
      }
      if (Array.isArray(storedPackages)) {
        setPackages(storedPackages);
      } else {
        setPackages(mockData);
        localStorage.setItem('packages', JSON.stringify(mockData));
      }
    };
    loadPackages();
  }, [navigate]);

  //rewrite this
  const handleStatusChange = (packageId, newStatus) => {
    const newPackageList = packages.map(packageItem => {
      if (packageItem.id === packageId) {
        return {
          ...packageItem,
          status: newStatus,
        };
      }
      return packageItem;
    });

    setPackages(newPackageList);
    localStorage.setItem('packages', JSON.stringify(newPackageList));
  };
  //this function take long time to accept the change and need refresh
  // const handleStatusChange = (a, b) => {
  //   for (let i = 0; i < packages.length; i++) {
  //     if (packages[i].id === a) {
  //       packages[i].status = b;
  //       break;
  //     }
  //   }
  //   setPackages(packages);
  //   localStorage['packages'] = JSON.stringify(packages);
  // };
  const handleDelete = (packageId) => {
    let newPackages = [];

    for (let i = 0; i < packages.length; i++) {
      if (packages[i].id !== packageId) {
        newPackages.push(packages[i]);
      }
    }
    setPackages(newPackages);
    let currentPackages = JSON.stringify(newPackages);
    localStorage.setItem('packages', currentPackages);
  };
//   const handleDelete = (packageId) => {
//   const newPackages = packages.filter(pkg => pkg.id !== packageId);
//   setPackages(newPackages);
//   localStorage.setItem('packages', JSON.stringify(newPackages));
// };

  const statusCounts = {
    Pending: packages.filter(pkg => pkg?.status === 'Pending').length,
    InTransit: packages.filter(pkg => pkg?.status === 'In Transit').length,
    Delivered: packages.filter(pkg => pkg?.status === 'Delivered').length,
    Total: packages.length,
  };

  const statuses = [
    {
      label: 'Pending',
      count: statusCounts.Pending,
      icon: <WatchLaterIcon sx={{ color: '#f59e0b' }} />,
      bgColor: '#fef3c7',
    },
    {
      label: 'In Transit',
      count: statusCounts.InTransit,
      icon: <LocalShippingIcon sx={{ color: '#3b82f6' }} />,
      bgColor: '#e0edff',
    },
    {
      label: 'Delivered',
      count: statusCounts.Delivered,
      icon: <CheckCircleIcon sx={{ color: '#10b981' }} />,
      bgColor: '#d1fae5',
    },
    {
      label: 'Total',
      count: statusCounts.Total,
      icon: <AllInboxIcon sx={{ color: '#9ca3af' }} />,
      bgColor: '#f3f4f6',
    },
  ];
  let maxPrice = 5000;

  const filterByPrice = (pkg) => {
    const [min, max] = priceRange;
    return (pkg.price > min && pkg.price < max);
  };

  const matcheSearch = (pkg) => {
    const searched = searchTerm.toLowerCase();
    return (
      pkg.recipient?.toLowerCase().includes(searched) ||
      pkg.address?.toLowerCase().includes(searched)
    );
  };
  const filterByPackageType = (pkg) => {
    if (packageTypeFilter === 'All Types') return true;
    return pkg.packageType === packageTypeFilter;
  };
  const filteredPhoneNumber = (phone) => {
    let filteredNumber = phone.replace(/\D/g, '');
    if (filteredNumber.startsWith('972'))
      filteredNumber = filteredNumber.slice(3);
    if (filteredNumber.startsWith('970'))
      filteredNumber = filteredNumber.slice(3);
    return filteredNumber;
  };
  const filterByPhone = (pkg) => {
    const filteredInput = filteredPhoneNumber(phoneFilter);
    const filteredPackagePhone = filteredPhoneNumber(pkg.phone);
    return filteredPackagePhone.includes(filteredInput);
  };

  const filteredPackages = packages.filter(pkg => {
    const matchingStatuses = filterStatus === 'All Statuses' || pkg.status === filterStatus;
    const matchesPrice = filterByPrice(pkg);
    const matchingSearch = matcheSearch(pkg);
    const matchingType = filterByPackageType(pkg);
    const matchingPhone = filterByPhone(pkg);
    return matchingStatuses && matchesPrice && matchingSearch && matchingType && matchingPhone;

  });
//.slice() without arguments returns a shallow copy of the original array.
  let sortedPackages = filteredPackages.slice();
  if (sortBy === 'Date Created (Newest)') {
    sortedPackages.sort(function (x, y) {
      return new Date(y.createdDate) - new Date(x.createdDate);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <PackageAppBar username="emilys" />

      <Box sx={{ flexGrow: 1, px: 25 }}>
        <Stack direction="row" spacing={4} mt={4} alignItems="flex-start">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 280 }}>
            <QuickActions onAddPackage={() => navigate('/add-package')} />
            <FilterSearchPanel
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              setPackageTypeFilter={setPackageTypeFilter}
              packageTypeFilter={packageTypeFilter}
              phoneFilter={phoneFilter}
              setPhoneFilter={setPhoneFilter}
            />
          </Box>

          <Box sx={{ flexGrow: 1, maxWidth: '1000px' }}>
            <Stack direction="row" spacing={2} mb={3}>
              {statuses.map((status, index) => (
                <StatusesCard key={index} status={status} index={index} />
              ))}
            </Stack>

            <PackageList
              packages={sortedPackages}
              onStatusChange={handleStatusChange}
              statuses={statuses}
              onDelete={handleDelete}
            />
          </Box>
        </Stack>
      </Box>

    </Box>
  );
};

export default Dashboard;