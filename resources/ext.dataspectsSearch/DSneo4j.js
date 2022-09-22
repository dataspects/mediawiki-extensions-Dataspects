require("./neo4j-driver.js");
DSNeo4j = class {
  constructor(uri, user, password) {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      encrypted: "ENCRYPTION_OFF",
    });
    this.session = driver.session();
  }

  numberOfNodes = async () => {
    try {
      const result = await this.session.run("MATCH (n) RETURN count(n)", {});
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return this.toNumber(node);
    } catch (error) {
      console.error(error);
    } finally {
      this.session.close();
    }
  };

  toNumber({ low, high }) {
    let res = high;
    for (let i = 0; i < 32; i++) {
      res *= 2;
    }
    return low + res;
  }
};

module.exports = { DSNeo4j };
