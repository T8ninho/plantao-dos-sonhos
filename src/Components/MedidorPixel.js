import { Dimensions } from "react-native";

export default function MedidorPixel(item) {
	const { width, height } = Dimensions.get('window');
	const smallestDimension = Math.min(width, height);
  
	const adjustedFontSize = (item / 400) * smallestDimension;
	return adjustedFontSize
  }
