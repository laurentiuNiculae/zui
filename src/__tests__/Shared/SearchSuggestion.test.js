import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from 'api';
import SearchSuggestion from 'components/SearchSuggestion';
import React from 'react';

// router mock
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const mockImageList = {
  GlobalSearch: {
    Repos: [
      {
        Name: 'alpine',
        Size: '2806985',
        LastUpdated: '2022-08-09T17:19:53.274069586Z',
        NewestImage: {
          Tag: 'latest',
          Description: 'w',
          IsSigned: true,
          Licenses: '',
          Vendor: '',
          Labels: ''
        }
      },
      {
        Name: 'mongo',
        Size: '231383863',
        LastUpdated: '2022-08-02T01:30:49.193203152Z',
        NewestImage: {
          Tag: 'latest',
          Description: '',
          IsSigned: false,
          Licenses: '',
          Vendor: '',
          Labels: ''
        }
      },
      {
        Name: 'nodeUnique',
        Size: '369311301',
        LastUpdated: '2022-08-23T00:20:40.144281895Z',
        NewestImage: {
          Tag: 'latest',
          Description: '',
          IsSigned: false,
          Licenses: '',
          Vendor: '',
          Labels: ''
        }
      }
    ]
  }
};

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe('Search component', () => {
  it('should display suggestions when user searches', async () => {
    // @ts-ignore
    jest.spyOn(api, 'get').mockResolvedValue({ status: 200, data: { data: mockImageList } });
    render(<SearchSuggestion />);
    const searchInput = screen.getByPlaceholderText(/search for content/i);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'test');
    expect(await screen.findByText(/alpine/i)).toBeInTheDocument();
  });
});