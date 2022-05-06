import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  public id: number;

  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
  tableName: 'teams',
});
