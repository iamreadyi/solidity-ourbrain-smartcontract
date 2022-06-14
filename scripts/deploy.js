const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    
  
    const brainContractFactory = await hre.ethers.getContractFactory("OurBrain");
    const brainContract = await brainContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.001"),
    });
    await brainContract.deployed();
    
  
    console.log("OurBrain address: ", brainContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);

    }
  };
  
  runMain();