import ABI from '../abi.json'

const petrol_addr="0x75c1e908E03Ce822A30e69Eb492B7b3d9700BFe0";
const newPetrolContract=web3=>{
    return new web3.eth.Contract(ABI,petrol_addr);
}
export default newPetrolContract;