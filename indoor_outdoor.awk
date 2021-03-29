BEGIN{
	FS=","
	indoor_temp = 0
	outdoor_temp = 0
	indoor_humidity = 0
	outdoor_humidity = 0
}

# indoor temp
/Oregon-THGR810/ {
	indoor_temp =$9
	indoor_humidity = $13
	print indoor_temp "," indoor_humidity "," outdoor_temp "," outdoor_humidity
	fflush(stdout)
}

# outdoor temp
/Acurite-Tower/ {
	outdoor_temp = $9
	outdoor_humidity = $13
}

# wind
/Oregon-WGR800/ {
}
