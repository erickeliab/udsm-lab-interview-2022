export function getProcessedData(
  yearOneData: any,
  yearTwoData: any,
  yearThreeData: any
) {
  //DEFINING CONSTANTS
  const minRate = 50;
  const activeMemberCode = "ACTIVE_MEMBERS";
  const membersRegisteredCode = "MEMBER_REGISTERED";

  // TODO:
  //check if all parameters are given
  if (yearOneData == null && yearTwoData == null && yearThreeData == null) return false;

  // 1. Remove data items that has reporting rate less than 50
  //Used filterByRate() function that takes two params 1. yeardata(Object) and 2.minRate(number)
  yearOneData = filterByRate(yearOneData,minRate);
  yearTwoData = filterByRate(yearTwoData,minRate);
  yearThreeData = filterByRate(yearThreeData,minRate);

  // Creating a single object to combine all the three filtered by reporting rate
    const yearsData = {
      yearOneData,
      yearTwoData,
      yearThreeData
    }

  // 2. Combine relevant data (data of the same code) from each year inorder to compute average
  // Used function combineData() to combine it takes two params i. yearsData object and active member code or members registered Code respectively

  const combinedActiveMembers = combineData(yearsData, activeMemberCode);
  const combinedMembersRegistered = combineData(yearsData, membersRegisteredCode);


  // 3. Compute average for the combined data to arrive to single value (average value)
  // Used findAverageValue() function that takes in one parameter of combined data of type object

  let averageActiveMembers = findAverageValue(combinedActiveMembers);
  let averagemembersRegistered = findAverageValue(combinedMembersRegistered);
 

  // 4. Return the averaged data as final output
   return [
      {
        value: averagemembersRegistered,
        name: 'Number of members registered',
        code: membersRegisteredCode,
      },
      {
        value: averageActiveMembers,
        name: 'Number of active members',
        code: activeMemberCode,
      },
    ]
   

}



// Function to filter data of a year by minimum rate given
// This function will return only objects with reporting rate 50 and above
function filterByRate(data:any,rate:number){

  data = data.filter((yearOneObject:any) => {

    if (yearOneObject.reportingRate >= rate ) {
      return yearOneObject;
    } 

  });


  return data;
}



// Combine data of the same code from given object that contains data from each year
// The code is also passed as a param

function combineData(data:any,code:string){

  // spread operator ... is used to populate all the items in an array to a parent array
  // filter function will return an array with items that pass the condition 

  return [ ...data.yearOneData.filter((a1:any) => { return a1.code == code}),
  ...data.yearTwoData.filter((a2:any) => { return a2.code == code}), 
  ...data.yearThreeData.filter((a3:any) => { return a3.code == code})];
}



// Fuction calculates average by computing sum and devide with length

function findAverageValue(data:any){
 
  // initializing sum to zero
  let sum = 0;
  data.forEach( function (item:any) {

    // adding each item value to sum
    sum += item.value

  });

  // deviding sum to total which is equal to data.length and return it
  return sum/data.length;
}
