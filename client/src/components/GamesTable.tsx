import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableFooterPagination from './tableFooterPagination';
import Button from '@mui/material/Button';
import { deleteGame } from '../api/games';
import { Game } from './AddGameForm';
import { AlertColor, CircularProgress } from '@mui/material';
import SearchBar from './SearchBar';
import CheckIcon from '@mui/icons-material/Check';

interface TableRow {
  _id: string;
  title: string;
  platform: string;
  cib: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setPlatform: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
  setTriggerRefresh: Dispatch<SetStateAction<boolean>>;
  setShouldAlert: Dispatch<SetStateAction<boolean>>;
  setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
}

const renderTableRow = ({
  _id,
  title,
  platform,
  cib,
  setOpen,
  setIsEdit,
  setTitle,
  setPlatform,
  setId,
  setTriggerRefresh,
  setShouldAlert,
  setAlertSeverity,
  setAlertMessage,
}: TableRow) => {
  const handleEditGame = () => {
    setOpen(true);
    setIsEdit(true);
    setTitle(title);
    setPlatform(platform);
    setId(_id);
  };

  const handleDeleteGame = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${title} from your database?`
      )
    )
      try {
        const removeGame = await deleteGame(_id);
        if (removeGame) {
          setShouldAlert(true);
          setAlertSeverity('success');
          setAlertMessage(`${title} successfully deleted.`);
          setTriggerRefresh(true);
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <TableRow
      key={_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      style={cib ? { background: '#FFFFE0' } : {}}
    >
      <TableCell>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h5" component="h5">
          {platform}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h5" component="h5">
          {cib && <CheckIcon />}
        </Typography>
      </TableCell>
      <TableCell>
        <Button onClick={handleEditGame}>
          {' '}
          <Typography variant="h6" component="h6">
            Edit Game
          </Typography>
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={handleDeleteGame}>
          <Typography variant="h6" component="h6">
            Delete Game
          </Typography>
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface GamesTable {
  games: Game[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setPlatform: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
  setTriggerRefresh: Dispatch<SetStateAction<boolean>>;
  setShouldAlert: Dispatch<SetStateAction<boolean>>;
  setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
}

export const GamesTable = ({
  games,
  setOpen,
  setIsEdit,
  setTitle,
  setPlatform,
  setId,
  setTriggerRefresh,
  setShouldAlert,
  setAlertSeverity,
  setAlertMessage,
}: GamesTable) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filter, setFilter] = useState('');
  const [videoGamesBeforeFilter, setVideoGamesBeforeFilter] =
    useState<Game[]>();
  const [videoGames, setVideoGames] = useState<Game[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (filter === '' || filter === 'All Platforms') {
      setVideoGames(games);
    } else {
      setVideoGames([
        ...games.filter((game) => game.platform === filter),
      ]);
    }
    setVideoGamesBeforeFilter(games);
  }, [games, filter]);

  const tableRows =
    videoGames &&
    videoGames
      .sort((game1: Game, game2: Game) =>
        game1.title === game2.title
          ? 0
          : game1.title > game2.title
          ? 1
          : -1
      )
      .map((game: Game) =>
        renderTableRow({
          _id: game._id,
          title: game.title,
          platform: game.platform,
          cib: game.cib,
          setOpen,
          setIsEdit,
          setTitle,
          setPlatform,
          setId,
          setTriggerRefresh,
          setShouldAlert,
          setAlertSeverity,
          setAlertMessage,
        })
      );

  const handleFilterChange = (
    event: ChangeEvent<{ value: string }> | SelectChangeEvent<string>
  ) => {
    setFilter(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<{ value: string }>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const platforms = [
    'All Platforms',
    'Nintendo',
    'Nintendo 64',
    'Sega Genesis',
    'Super Nintendo',
  ];

  const tableHeaders = ['Title', 'Platform', 'CIB', '', ''];

  const handleFilterGames = async (searchQuery: string) => {
    if (searchQuery === '') {
      setVideoGames(videoGamesBeforeFilter);
      return;
    }
    try {
      setIsLoading(true);
      setVideoGames(
        videoGamesBeforeFilter &&
          videoGamesBeforeFilter.filter((game) => {
            return (
              game.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              game.platform
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          })
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Box my={2}>
        <SearchBar
          placeholder="Search (Game)"
          handleSearch={(str) => handleFilterGames(str)}
        />
        {isLoading && (
          <Box ml={3}>
            <CircularProgress />
          </Box>
        )}
        <FormControl style={{ width: '200px' }}>
          <InputLabel id="platform">Platform</InputLabel>
          <Select
            labelId="filter"
            id="filter"
            value={filter}
            label="Filter by Platform"
            onChange={handleFilterChange}
          >
            {platforms.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 300 }}
          size="small"
          aria-label="Video Game Inventory"
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>
                  <Typography
                    style={{ fontWeight: 900 }}
                    variant="h4"
                    component="h4"
                  >
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {videoGames && videoGames.length > 0
              ? rowsPerPage > 0
                ? tableRows &&
                  tableRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tableRows
              : null}
          </TableBody>
          {videoGames && videoGames.length > 10 ? (
            <TableFooterPagination
              count={videoGames.length}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              colSpan={6}
            />
          ) : null}
        </Table>
      </TableContainer>
    </Box>
  );
};
