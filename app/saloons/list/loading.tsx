// loading all saloons table(page)

import { Skeleton } from '@/app/components';
import { Table } from "@radix-ui/themes";
import SaloonActions from "./SaloonActions";

const LoadingSaloonsPage = async () => {
  const saloons = [1, 2, 3, 4, 5];

  return (
    <div>
      <SaloonActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Saloon</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {saloons.map((saloon) => (
            <Table.Row key={saloon}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingSaloonsPage;
