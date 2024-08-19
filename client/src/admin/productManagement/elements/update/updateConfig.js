/** @format */

import React from "react";
import { Body, ConfigInfo } from "../../common/assets/update.style";
import { TextField } from "@mui/material";

export const UpdateConfig = ({ register, productUpdate }) => {
  const {
    screen,
    system,
    frontCamera,
    rearCamera,
    chip,
    ram,
    rom,
    sim,
    battery,
  } = productUpdate.configuration;

  return (
    <Body>
      <ConfigInfo>
        <TextField
          label='Màn hình'
          variant='outlined'
          size='small'
          defaultValue={screen}
          {...register("screen")}
          fullWidth
        />
        <TextField
          label='Hệ điều hành'
          variant='outlined'
          size='small'
          {...register("system")}
          defaultValue={system}
          fullWidth
        />
        <TextField
          label='Camera trước'
          variant='outlined'
          size='small'
          {...register("frontCamera")}
          defaultValue={frontCamera}
          fullWidth
        />
        <TextField
          label='Camera sau'
          variant='outlined'
          size='small'
          {...register("rearCamera")}
          defaultValue={rearCamera}
          fullWidth
        />
        <TextField
          label='Chip'
          variant='outlined'
          size='small'
          {...register("chip")}
          defaultValue={chip}
          fullWidth
        />
        <TextField
          label='RAM'
          variant='outlined'
          size='small'
          {...register("ram")}
          defaultValue={ram}
          fullWidth
        />
        <TextField
          label='Dung lượng lưu trữ'
          variant='outlined'
          size='small'
          {...register("rom")}
          defaultValue={rom}
          fullWidth
        />
        <TextField
          label='SIM'
          variant='outlined'
          size='small'
          {...register("sim")}
          defaultValue={sim}
          fullWidth
        />
        <TextField
          label='Pin, Sạc'
          variant='outlined'
          size='small'
          {...register("battery")}
          defaultValue={battery}
          fullWidth
        />
      </ConfigInfo>
    </Body>
  );
};

export default UpdateConfig;
