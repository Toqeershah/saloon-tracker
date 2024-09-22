//single saloon detail page & it importing two seperate files SaloonDetails and EditSaloonButton

import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditSaloonButton from "./EditSaloonButton";
import SaloonDetails from "./SaloonDetails";
import DeleteSaloonButton from "./DeleteSaloonButton";

interface Props {
  params: { id: string };
}

const SaloonDetailPage = async ({ params }: Props) => {
  // if (typeof params.id !== 'number') notFound();

  const saloon = await prisma.saloon.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!saloon) notFound();
  await delay(2000);

  return (
    <>
      <div>
        <h2 className="mb-5 font-semi-bold text-lg">
          Single Saloon Detail Page
        </h2>
      </div>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <SaloonDetails saloon={saloon} />
        </Box>
        <Box>
          <Flex direction="column" gap='4'>
            <EditSaloonButton saloonId={saloon.id} />
            <DeleteSaloonButton saloonId={saloon.id} />
          </Flex>
        </Box>
      </Grid>
    </>
  );
};

export default SaloonDetailPage;
