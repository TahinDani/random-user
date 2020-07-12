import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';

const UserList = () => {
	const [users, setUsers] = useState([])
	const [gender, setGender] = useState("all")
	
	useEffect(() => {
		const hasTwoPrimes = (num) => {
			let primesCount = 0
			const numString = num.toString()
			for (let i of numString) {
				// there could be a check here: if it's the last digit and there is no prime yet -> break
				if (isPrime(Number(i))) {
					primesCount++
					if (primesCount === 2) {
						return true
					}
				}
			}
			return false
		}
		const fetchData = async () => {
			const result = await fetch("https://randomuser.me/api/?results=200&seed=abc&exc=login")
			const resultJson = await result.json()
			const filteredByZip = resultJson.results.filter(user => hasTwoPrimes(user.location.postcode))
			setUsers(filteredByZip)
		}
		fetchData();
	}, []);

	const isPrime = (num) => {
		for(let i = 2, s = Math.sqrt(num); i <= s; i++)
				if(num % i === 0) return false; 
		return num > 1;
	}

	const handleGenderChange = (e) => {
		console.log(e.target.value);
		setGender(e.target.value)
	}

	const genderOptions = [
		{ label: 'females', value: 'females' },
		{ label: 'males', value: 'males' },
		{ label: 'all', value: 'all' },
	];

	return (
		<div className="Userlist">
			<div className="Userlist-checkboxes">
			<Radio.Group
					options={genderOptions}
					onChange={handleGenderChange}
					value={gender}
					optionType="button"
				/>
				{/* Users goes here */}
			</div>
		</div>
	);
};

export default UserList;