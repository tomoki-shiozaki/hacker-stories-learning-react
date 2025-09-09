export const getSumComments = (stories) => {
  console.log("C");
  return stories.data.reduce((result, value) => result + value.num_comments, 0);
};
