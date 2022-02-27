const { ethers, Wallet } = require("ethers");
const abi = require("./abi.json")
require("dotenv").config()


const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.PROJECT_ID);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const signer = wallet.connect(provider)
const contract = new ethers.Contract("0xC33a4EfecB11D2cAD8E7d8d2a6b5E7FEacCC521d", abi, provider)

const contractWithSigner = contract.connect(wallet);

async function tx() {
    try {
        const transaction = await contractWithSigner.summonMoloch([wallet.address], ["0x6d7f0754ffeb405d23c51ce938289d4835be3b14"], 3600, 48, 24, 300000, 3, 30000, [5])
        const receipt = await transaction.wait()
        console.log(receipt)
    } catch (error) {
        console.log(error)
    }
}

tx()