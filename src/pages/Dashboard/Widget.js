import { Card, Row } from "antd";
import React, { useEffect, useState } from "react";
import usecustomStyles from "../../Common/customStyles";
import CountUp from "react-countup";

import BlockChain from "../../../src/assets/images/1.svg";
import Blocks from "../../../src/assets/images/2.svg";
import Storage from "../../../src/assets/images/3.svg";
import Users from "../../../src/assets/images/4.svg";
import Encrypted from "../../../src/assets/images/5.svg";


const customStyles = usecustomStyles();

const Widget = () => {
  const [blocklistCount, setBlocklistCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [blockSize, setBlockSize] = useState("0 GB");
  const [encryptedKeysCount, setEncryptedKeysCount] = useState(0);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    getBlockCount(username, password);
    getUserCount(username, password);
    getBlockSize(username, password);
    countEncryptedKeys(username, password);
  }, []);

  const getUserCount = async (username, password) => {
    try {
      await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_user_count?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.getItem("api_key"),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            setUserCount(data);
          }
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  async function getBlockSize(){
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      const blockSizeResponse = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_block_size?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.getItem("api_key"),
            "Content-Type": "application/json",
          },
        }
      );
      const blockSizeText = await blockSizeResponse.text();
      setBlockSize(blockSizeText);
      
  } 
  catch (error) {
    console.error("Error during login:", error);
  }
}

  async function getBlockCount() {
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      const blockListResponse = await fetch(
        `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_block_list?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.getItem("api_key"),
            "Content-Type": "application/json",
          },
        }
      );

      const blockListData = await blockListResponse.json();

      if (blockListData) {
        setBlocklistCount(blockListData.blockchains.length);

        let totalBlockSize = 0;

        for (const item of blockListData.blockchains) {
          const blockDataResponse = await fetch(
            `https://dashboard.postgresbc.info/cgi-bin/pgbc_api/search_block_data?username=${username}&password=${password}&ddl=SELECT%20COUNT(oidxid)%20FROM%20.${item}`,
            {
              method: "POST",
              headers: {
                Authorization: "Basic " + localStorage.getItem("api_key"),
                "Content-Type": "application/json",
              },
            }
          );

          const blockData = await blockDataResponse.json();

          if (
            blockData &&
            blockData.results &&
            blockData.results[0] &&
            blockData.results[0].count
          ) {
            totalBlockSize += parseInt(blockData.results[0].count);
          }
          setBlocks(totalBlockSize);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function countEncryptedKeys() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
  
    try {
      // Fetch the list of blockchains
      const blockListResponse = await fetch(`https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_block_list?username=${username}&password=${password}`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.getItem("api_key"),
          "Content-Type": "application/json",
        },
      });
  
      const blockListData = await blockListResponse.json();
      const blockchains = blockListData.blockchains;
  
      let totalEncryptedKeyCount = 0;
  
      // Iterate through each blockchain to fetch its schematic and count encrypted keys
      for (const blockchain of blockchains) {
        const response = await fetch(`https://dashboard.postgresbc.info/cgi-bin/pgbc_api/get_block_schematic?username=${username}&password=${password}&blockchain=${blockchain}`, {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.getItem("api_key"),
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        
        let encryptedKeyCount = 0;
        data.schema.forEach((item) => {
          if (item.key_name.toLowerCase().endsWith("encrypt")) {
            encryptedKeyCount++;
          }
        });
  
        totalEncryptedKeyCount += encryptedKeyCount;
      }
  
      setEncryptedKeysCount(totalEncryptedKeyCount);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  
  return (
    <React.Fragment>
      <Row
        xs={24}
        xl={8}
        gutter={[14, 14]}
        style={{ marginTop: customStyles.margin }}
      >
        <Card
          style={{
            marginBottom: customStyles.margin,
            marginRight: 14,
            borderRadius: 20,
            minWidth: "215px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={BlockChain} sizes="52" />
              <p
                style={{
                  fontSize: "16px",
                  color: "#141414",
                  marginTop: "10%",
                  fontWeight: 500,
                }}
              >
                Blockchain count
              </p>
              <h4 style={{ fontSize: "28px", fontWeight: 600 }}>
                <CountUp
                  start={0}
                  end={blocklistCount}
                  duration={1}
                  decimal="."
                  decimals={0}
                />
              </h4>
            </div>
          </div>
        </Card>
        <Card
          style={{
            marginBottom: customStyles.margin,
            marginRight: 14,
            borderRadius: 20,
            minWidth: "215px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={Blocks} sizes="52" />
              <p
                style={{
                  fontSize: "16px",
                  color: "#141414",
                  marginTop: "10%",
                  fontWeight: 500,
                }}
              >
                Total blocks
              </p>
              <h4 style={{ fontSize: "28px", fontWeight: 600 }}>
                <CountUp
                  start={0}
                  end={blocks}
                  duration={1}
                  decimal="."
                  decimals={0}
                />
              </h4>
            </div>
          </div>
        </Card>
        <Card
          style={{
            marginBottom: customStyles.margin,
            marginRight: 14,
            borderRadius: 20,
            minWidth: "215px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={Storage} sizes="52" />
              <p
                style={{
                  fontSize: "16px",
                  color: "#141414",
                  marginTop: "10%",
                  fontWeight: 500,
                }}
              >
                Storage used
              </p>
              <h4 style={{ fontSize: "28px", fontWeight: 600 }}>
                {blockSize} {}
              </h4>
            </div>
          </div>
        </Card>
        <Card
          style={{
            marginBottom: customStyles.margin,
            marginRight: 14,
            borderRadius: 20,
            minWidth: "215px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={Users} sizes="52" />
              <p
                style={{
                  fontSize: "16px",
                  color: "#141414",
                  marginTop: "10%",
                  fontWeight: 500,
                }}
              >
                User counts
              </p>
              <h4 style={{ fontSize: "28px", fontWeight: 600 }}>
                <CountUp
                  start={0}
                  end={userCount}
                  duration={1}
                  decimal="."
                  decimals={0}
                />
              </h4>
            </div>
          </div>
        </Card>
        <Card
          style={{
            marginBottom: customStyles.margin,
            marginRight: 14,
            borderRadius: 20,
            minWidth: "215px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={Encrypted} sizes="52" />
              <p
                style={{
                  fontSize: "16px",
                  color: "#141414",
                  marginTop: "10%",
                  fontWeight: 500,
                }}
              >
                Encrypted
              </p>
              <h4 style={{ fontSize: "28px", fontWeight: 600 }}>
                <CountUp
                start={0}
                end={encryptedKeysCount} 
                duration={1}
                decimal="."
                decimals={0}
                />
              </h4>
            </div>
          </div>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default Widget;
