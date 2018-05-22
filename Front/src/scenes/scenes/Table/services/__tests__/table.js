// @flow
import 'mock-setup';
import Deferred from 'mock-setup/Deferred';
import { deferredFetchResult } from 'mock-setup/fetch';

import TableView from '../../viewModels/Table';
import TableService from '../Table';

test('load next page', async () => {
    const tableView = new TableView();

    const tableResultD = new Deferred();

    const s: any = {
        viewModels: {
            table: tableView,
        },
        services: {
            apiClient: {
                tableGet: () => deferredFetchResult(tableResultD),
            },
        },
    };

    const service = new TableService(s);

    tableResultD.resolve({
        data: [{ id: 1 }, { id: 2 }],
        numberOfPages: 1559,
        totalResults: 77930,
    });

    await service.loadNextPage();

    expect(tableView).toMatchSnapshot();
});
