import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button } from "web3uikit";
import { abi, contractAddresses } from "../constants";

export default function Voting() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const votingAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [address, setAddress] = useState([
    "0xF2D436aF71c57B2eDA53395258508B172fC51cB6",
    "0x4Aa1fb94Cc512d2839d281F4765D1A2B263c906b",
  ]);

  const [name, setName] = useState("Where To Go");
  const [choices, setChoices] = useState([
    "go left",
    " go right",
    " sit still",
  ]);
  const [offset, setOffset] = useState("100");
  const [ballotId, setBallotId] = useState("0");
  const [ballotIdR, setBallotIdR] = useState("0");
  const [choiceId, setChoiceId] = useState("1");
  const { runContractFunction: addVoters } = useWeb3Contract({
    abi: abi,
    contractAddress: votingAddress,
    functionName: "addVoters",
    params: { _voters: address },
  });
  const { runContractFunction: vote } = useWeb3Contract({
    abi: abi,
    contractAddress: votingAddress,
    functionName: "vote",
    params: { ballotId: ballotId, choiceId: choiceId },
  });
  const { runContractFunction: result } = useWeb3Contract({
    abi: abi,
    contractAddress: votingAddress,
    functionName: "result",
    params: { ballotId: ballotIdR },
  });
  const { runContractFunction: createBallot } = useWeb3Contract({
    abi: abi,
    contractAddress: votingAddress,
    functionName: "createBallot",
    params: {
      name: name,
      choices: choices,
      offset: offset,
    },
  });
  // const set = async () => {
  //   setAddress = [""];
  //   console.log(address);
  //   if (add.trim() !== "") {
  //     setAddress([...address, { add }]);
  //   }
  // };

  // useEffect(() => {}, [add]);
  // console.log(add);
  async function successResult() {
    const resu = await result();
    document.getElementById("result").innerHTML = resu;
  }

  return (
    <div>
      <div className="flex justify-center pt-8 space-x-4">
        <Input
          label="Enter list of voters"
          name="voters"
          onBlur={function noRefCheck() {}}
          value={address}
          onChange={({ target }) => setAddress(target?.value)}
          type="text"
        />
        <Button
          color="blue"
          onClick={async function () {
            console.log("clicked button");
            await addVoters();
            console.log("got it?");
          }}
          text="add voters"
          theme="colored"
        />
      </div>
      <br />
      <br />
      <div>
        <div className="flex justify-center  space-x-20">
          <Input
            label="Enter the name of ballot"
            name="name"
            onBlur={function noRefCheck() {}}
            value={name}
            onChange={({ target }) => setName(target?.value)}
            type="text"
          />
          <Input
            label="Enter list of choices"
            name="choices"
            onBlur={function noRefCheck() {}}
            value={choices}
            onChange={({ target }) => setChoices(target?.value)}
            type="text"
          />
          <Input
            label="Enter offset"
            name="offset"
            onBlur={function noRefCheck() {}}
            value={offset}
            onChange={({ target }) => setOffset(target?.value)}
            type="text"
          />
        </div>
        <div className="flex justify-center  pt-5">
          <Button
            color="blue"
            onClick={async function () {
              console.log("clicked button");
              await createBallot();
              console.log("got it?");
            }}
            text="Create Ballot"
            theme="colored"
          />
        </div>
      </div>
      <div className="flex pt-5 justify-center space-x-10 pb-10">
        <Input
          label="Enter The ballotId"
          name="ballotId"
          onBlur={function noRefCheck() {}}
          value={ballotId}
          onChange={({ target }) => setBallotId(target?.value)}
          type="text"
        />
        <Button
          color="blue"
          onClick={async function () {
            console.log("clicked button");
            await vote({
              onError: console.log("only voters can vote"),
            });
          }}
          text="Vote"
          theme="colored"
        />
        <Input
          label="Enter The choiceId to vote"
          name="choiceId"
          onBlur={function noRefCheck() {}}
          value={choiceId}
          onChange={({ target }) => setChoiceId(target?.value)}
          type="text"
        />
      </div>

      <div>
        <div className="flex justify-center">
          <Input
            label="Enter The ballotId to get result"
            name="ballotIdR"
            onBlur={function noRefCheck() {}}
            value={ballotIdR}
            onChange={({ target }) => setBallotIdR(target?.value)}
            type="number"
          />
        </div>
        <div className="flex justify-center">
          <Button
            color="blue"
            onClick={async function () {
              console.log("clicked button");
              await successResult();
            }}
            text="Result"
            theme="colored"
          />
        </div>
        <span id="result" className="flex justify-center pt-1 ml-2">
          Result:
        </span>
      </div>
    </div>
  );
}
