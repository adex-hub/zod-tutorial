// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

// The challenge is to basically represent this the zod way.
// interface Results {
//   results: {
//     name: string;
//   }[];
// }

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});
//                            ^ 🕵️‍♂️

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then((res) => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);

  console.log(parsedData);

  return parsedData.results;
};

// TESTS

it("Should return the name", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
  });
});
