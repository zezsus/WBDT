/** @format */

import { TextField } from "@mui/material";
import { Body, ConfigInfo } from "../../common/assets/create.style";

export const AddConfig = ({ register }) => {
  return (
    <Body>
      <ConfigInfo>
        <TextField
          label='Màn hình'
          variant='outlined'
          size='small'
          {...register("screen")}
          fullWidth
        />
        <TextField
          label='Hệ điều hành'
          variant='outlined'
          size='small'
          {...register("system")}
          fullWidth
        />
        <TextField
          label='Camera trước'
          variant='outlined'
          size='small'
          {...register("frontCamera")}
          fullWidth
        />
        <TextField
          label='Camera sau'
          variant='outlined'
          size='small'
          {...register("rearCamera")}
          fullWidth
        />
        <TextField
          label='Chip'
          variant='outlined'
          size='small'
          {...register("chip")}
          fullWidth
        />
        <TextField
          label='RAM'
          variant='outlined'
          size='small'
          {...register("ram")}
          fullWidth
        />
        <TextField
          label='Dung lượng lưu trữ'
          variant='outlined'
          size='small'
          {...register("rom")}
          fullWidth
        />
        <TextField
          label='SIM'
          variant='outlined'
          size='small'
          {...register("sim")}
          fullWidth
        />
        <TextField
          label='Pin, Sạc'
          variant='outlined'
          size='small'
          {...register("battery")}
          fullWidth
        />
      </ConfigInfo>
    </Body>
  );
};

export default AddConfig;
