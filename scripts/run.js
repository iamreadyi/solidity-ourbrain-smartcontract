const main = async () => {
  const brainContractFactory = await hre.ethers.getContractFactory("OurBrain");
  const brainContract = await brainContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await brainContract.deployed();
  console.log("Contract added by:", brainContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    brainContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let brainTxn = await brainContract.sendThought("Random thought ");
  await brainTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(brainContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const [_, randomPerson] = await hre.ethers.getSigners();
  brainTxn = await brainContract
    .connect(randomPerson)
    .sendThought("Another message!");
  await brainTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(brainContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allThoughts = await brainContract.getAllThoughts();
  console.log(allThoughts);
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
